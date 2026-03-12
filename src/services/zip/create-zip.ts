import fs from "node:fs";
import path from "node:path";
import archiver from "archiver";
import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { collectZipInputs } from "./collect-zip-inputs.js";
import { resolveZipOutputPath } from "./resolve-zip-output.js";
import type { ZipCommandOptions, ZipExecutionPlan } from "./zip.types.js";

function resolveCompressionLevel(level?: number): number {
  const resolvedLevel = level ?? 9;

  if (
    !Number.isInteger(resolvedLevel) ||
    resolvedLevel < 0 ||
    resolvedLevel > 9
  ) {
    throw new BRUtilsError(
      "Compression level must be an integer between 0 and 9."
    );
  }

  return resolvedLevel;
}

function getSourceType(sourcePath: string): "file" | "directory" {
  return fs.statSync(sourcePath).isDirectory() ? "directory" : "file";
}

function ensureOutputCanBeWritten(outputPath: string, force = false): void {
  if (fs.existsSync(outputPath) && !force) {
    throw new BRUtilsError(
      `Output file already exists: ${outputPath}. Use --force to overwrite it.`
    );
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

export function createZipExecutionPlan(
  sourcePath: string,
  positionalOut?: string,
  options: ZipCommandOptions = {}
): ZipExecutionPlan {
  if (positionalOut && options.out) {
    throw new BRUtilsError("Use either positional [out] or --out, not both.");
  }

  const resolvedOutputPath = path.resolve(
    resolveZipOutputPath(sourcePath, positionalOut ?? options.out)
  );

  return {
    sourcePath: path.resolve(sourcePath),
    outputPath: resolvedOutputPath,
    sourceType: getSourceType(path.resolve(sourcePath)),
    exclude: options.exclude ?? [],
    contentsOnly: options.contentsOnly ?? false,
    level: resolveCompressionLevel(options.level)
  };
}

export async function createZip(
  sourcePath: string,
  positionalOut?: string,
  options: ZipCommandOptions = {}
): Promise<ZipExecutionPlan> {
  const plan = createZipExecutionPlan(sourcePath, positionalOut, options);

  if (options.dryRun) {
    return plan;
  }

  ensureOutputCanBeWritten(plan.outputPath, options.force);

  const outputStream = fs.createWriteStream(plan.outputPath);
  const archive = archiver("zip", {
    zlib: { level: plan.level }
  });

  await new Promise<void>((resolve, reject) => {
    outputStream.on("close", () => resolve());
    archive.on("error", (error) => reject(error));
    archive.pipe(outputStream);

    const inputs = collectZipInputs(plan.sourcePath, plan.outputPath, options);

    for (const input of inputs) {
      if (options.verbose && !options.quiet) {
        console.log(`[zip] adding ${input.entryName}`);
      }

      if (input.type === "directory") {
        archive.directory(input.sourcePath, input.entryName);
      } else {
        archive.file(input.sourcePath, { name: input.entryName });
      }
    }

    archive.finalize().catch(reject);
  });

  return plan;
}
