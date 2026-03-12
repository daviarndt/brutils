import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import yauzl from "yauzl";
import { matchesGlob } from "../../core/utils/glob.js";
import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { ensureZipSourceIsValid } from "../archive/zip-archive.js";
import { resolveUnzipOutputPath } from "./resolve-unzip-output.js";
import type { UnzipCommandOptions, UnzipExecutionPlan } from "./unzip.types.js";

function ensureOutputCanBeExtracted(outputDir: string, force = false): void {
  if (fs.existsSync(outputDir) && !force) {
    throw new BRUtilsError(
      `Output directory already exists: ${outputDir}. Use --force to overwrite it.`
    );
  }

  if (fs.existsSync(outputDir) && force) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  fs.mkdirSync(outputDir, { recursive: true });
}

function normalizeEntryPath(entryPath: string): string {
  return entryPath.replace(/\\/g, "/");
}

function shouldIncludeEntry(entryPath: string, match?: string): boolean {
  if (!match) {
    return true;
  }

  return matchesGlob(normalizeEntryPath(entryPath), match);
}

function resolveTargetRelativePath(entryPath: string, flat: boolean): string {
  if (!flat) {
    return normalizeEntryPath(entryPath);
  }

  return path.posix.basename(normalizeEntryPath(entryPath));
}

function resolveSafeDestination(
  outputDir: string,
  relativePath: string
): string {
  const destination = path.resolve(outputDir, relativePath);
  const resolvedOutputDir = path.resolve(outputDir);
  const outputPrefix = `${resolvedOutputDir}${path.sep}`;

  if (
    destination !== resolvedOutputDir &&
    !destination.startsWith(outputPrefix)
  ) {
    throw new BRUtilsError(`Unsafe zip entry path detected: ${relativePath}`);
  }

  return destination;
}

function openZipFile(sourcePath: string): Promise<yauzl.ZipFile> {
  ensureZipSourceIsValid(sourcePath);

  return new Promise((resolve, reject) => {
    yauzl.open(
      sourcePath,
      {
        lazyEntries: true,
        decodeStrings: true,
        validateEntrySizes: true
      },
      (error, zipFile) => {
        if (error) {
          reject(error);
          return;
        }

        if (!zipFile) {
          reject(new BRUtilsError("Could not open zip file."));
          return;
        }

        resolve(zipFile);
      }
    );
  });
}

export function createUnzipExecutionPlan(
  sourcePath: string,
  positionalOut?: string,
  options: UnzipCommandOptions = {}
): UnzipExecutionPlan {
  if (positionalOut && options.out) {
    throw new BRUtilsError("Use either positional [out] or --out, not both.");
  }

  const resolvedSourcePath = path.resolve(sourcePath);
  const resolvedOutputDir = path.resolve(
    resolveUnzipOutputPath(sourcePath, positionalOut ?? options.out)
  );

  return {
    sourcePath: resolvedSourcePath,
    outputDir: resolvedOutputDir,
    flat: options.flat ?? false,
    ...(options.match ? { match: options.match } : {})
  };
}

export async function extractZipFile(
  sourcePath: string,
  positionalOut?: string,
  options: UnzipCommandOptions = {}
): Promise<UnzipExecutionPlan> {
  const plan = createUnzipExecutionPlan(sourcePath, positionalOut, options);

  ensureZipSourceIsValid(plan.sourcePath);

  if (options.dryRun) {
    return plan;
  }

  ensureOutputCanBeExtracted(plan.outputDir, options.force);

  if (options.verbose && !options.quiet) {
    console.log(`[unzip] extracting ${plan.sourcePath} -> ${plan.outputDir}`);
  }

  const zipFile = await openZipFile(plan.sourcePath);
  const flatTargets = new Set<string>();

  await new Promise<void>((resolve, reject) => {
    zipFile.on("entry", (entry) => {
      const entryPath = normalizeEntryPath(entry.fileName);

      void (async () => {
        try {
          if (!shouldIncludeEntry(entryPath, options.match)) {
            zipFile.readEntry();
            return;
          }

          const isDirectory = entryPath.endsWith("/");
          const targetRelativePath = resolveTargetRelativePath(
            entryPath,
            options.flat ?? false
          );

          if (!targetRelativePath) {
            zipFile.readEntry();
            return;
          }

          if (
            (options.flat ?? false) &&
            flatTargets.has(targetRelativePath) &&
            !isDirectory
          ) {
            throw new BRUtilsError(
              `Flat extraction would overwrite a file more than once: ${targetRelativePath}`
            );
          }

          if ((options.flat ?? false) && !isDirectory) {
            flatTargets.add(targetRelativePath);
          }

          const destinationPath = resolveSafeDestination(
            plan.outputDir,
            targetRelativePath
          );

          if (options.verbose && !options.quiet) {
            console.log(`[unzip] extracting ${entryPath}`);
          }

          if (isDirectory) {
            if (!(options.flat ?? false)) {
              fs.mkdirSync(destinationPath, { recursive: true });
            }

            zipFile.readEntry();
            return;
          }

          fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

          await new Promise<void>((entryResolve, entryReject) => {
            zipFile.openReadStream(entry, async (error, stream) => {
              if (error) {
                entryReject(error);
                return;
              }

              if (!stream) {
                entryReject(
                  new BRUtilsError(
                    `Could not read archive entry: ${entry.fileName}`
                  )
                );
                return;
              }

              try {
                await pipeline(stream, fs.createWriteStream(destinationPath));
                entryResolve();
              } catch (streamError) {
                entryReject(streamError);
              }
            });
          });

          zipFile.readEntry();
        } catch (error) {
          zipFile.close();
          reject(error);
        }
      })();
    });

    zipFile.once("end", () => {
      zipFile.close();
      resolve();
    });

    zipFile.once("error", (error) => {
      zipFile.close();
      reject(error);
    });

    zipFile.readEntry();
  });

  return plan;
}
