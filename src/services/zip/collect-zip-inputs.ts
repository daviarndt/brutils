import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type { ZipCommandOptions, ZipInputEntry } from "./zip.types.js";

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

  if (!options.contentsOnly) {
    return [
      {
        type: "directory",
        sourcePath: resolvedSource,
        entryName: path.basename(resolvedSource)
      }
    ];
  }

  const excludePatterns = options.exclude ?? [];
  const outputAbsolutePath = path.resolve(outputPath);

  const entries = fg.sync(["**/*"], {
    cwd: resolvedSource,
    onlyFiles: false,
    dot: true,
    ignore: excludePatterns
  });

  return entries
    .map<ZipInputEntry | null>((entry) => {
      const absoluteEntryPath = path.join(resolvedSource, entry);

      if (path.resolve(absoluteEntryPath) === outputAbsolutePath) {
        return null;
      }

      return {
        type: fs.statSync(absoluteEntryPath).isDirectory()
          ? "directory"
          : "file",
        sourcePath: absoluteEntryPath,
        entryName: entry
      };
    })
    .filter((entry): entry is ZipInputEntry => entry !== null);
}
