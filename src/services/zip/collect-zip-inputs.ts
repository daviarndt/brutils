import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type { ZipCommandOptions, ZipInputEntry } from "./zip.types.js";

function normalizeEntryName(value: string): string {
  return value.replace(/\\/g, "/");
}

function isDirectory(sourcePath: string): boolean {
  return fs.statSync(sourcePath).isDirectory();
}

function isFile(sourcePath: string): boolean {
  return fs.statSync(sourcePath).isFile();
}

export function collectZipInputs(
  sourcePath: string,
  outputPath: string,
  options: ZipCommandOptions = {}
): ZipInputEntry[] {
  const resolvedSource = path.resolve(sourcePath);

  if (!fs.existsSync(resolvedSource)) {
    throw new BRUtilsError(`Source path does not exist: ${sourcePath}`);
  }

  if (isFile(resolvedSource)) {
    return [
      {
        type: "file",
        sourcePath: resolvedSource,
        entryName: path.basename(resolvedSource)
      }
    ];
  }

  if (!isDirectory(resolvedSource)) {
    throw new BRUtilsError(`Unsupported source type: ${sourcePath}`);
  }

  const excludePatterns = options.exclude ?? [];
  const outputAbsolutePath = path.resolve(outputPath);
  const rootEntryName = path.basename(resolvedSource);
  const entries = fg.sync(["**/*", "**/.*"], {
    cwd: resolvedSource,
    onlyFiles: false,
    onlyDirectories: false,
    dot: true,
    followSymbolicLinks: options.followSymlinks ?? false,
    unique: true,
    ignore: excludePatterns,
    markDirectories: true
  });

  if (entries.length === 0) {
    return options.contentsOnly
      ? []
      : [
          {
            type: "directory",
            sourcePath: resolvedSource,
            entryName: `${rootEntryName}/`
          }
        ];
  }

  return entries
    .map<ZipInputEntry | null>((entry) => {
      const cleanedEntry = entry.endsWith("/") ? entry.slice(0, -1) : entry;
      const absoluteEntryPath = path.join(resolvedSource, cleanedEntry);

      if (path.resolve(absoluteEntryPath) === outputAbsolutePath) {
        return null;
      }

      const relativeEntryName = options.contentsOnly
        ? cleanedEntry
        : path.join(rootEntryName, cleanedEntry);

      const entryType = entry.endsWith("/") ? "directory" : "file";

      return {
        type: entryType,
        sourcePath: absoluteEntryPath,
        entryName: normalizeEntryName(
          entryType === "directory"
            ? `${relativeEntryName}/`
            : relativeEntryName
        )
      };
    })
    .filter((entry): entry is ZipInputEntry => entry !== null);
}
