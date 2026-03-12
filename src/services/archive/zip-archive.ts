import fs from "node:fs";
import path from "node:path";
import { Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import yauzl from "yauzl";
import { matchesGlob } from "../../core/utils/glob.js";
import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type {
  ZipArchiveEntryInfo,
  ZipListOptions,
  ZipTestOptions,
  ZipTestResult
} from "./zip-archive.types.js";

function normalizeEntryPath(entryPath: string): string {
  return entryPath.replace(/\\/g, "/");
}

export function ensureZipSourceIsValid(sourcePath: string): void {
  if (!fs.existsSync(sourcePath)) {
    throw new BRUtilsError(`Zip file does not exist: ${sourcePath}`);
  }

  if (!fs.statSync(sourcePath).isFile()) {
    throw new BRUtilsError(`Source is not a file: ${sourcePath}`);
  }

  if (path.extname(sourcePath).toLowerCase() !== ".zip") {
    throw new BRUtilsError("Only .zip files are supported.");
  }
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

function shouldIncludeEntry(entryPath: string, match?: string): boolean {
  if (!match) {
    return true;
  }

  return matchesGlob(normalizeEntryPath(entryPath), match);
}

export async function listZipArchiveEntries(
  sourcePath: string,
  options: ZipListOptions = {}
): Promise<ZipArchiveEntryInfo[]> {
  const zipFile = await openZipFile(sourcePath);

  return new Promise((resolve, reject) => {
    const entries: ZipArchiveEntryInfo[] = [];

    zipFile.on("entry", (entry) => {
      const entryPath = normalizeEntryPath(entry.fileName);

      if (shouldIncludeEntry(entryPath, options.match)) {
        entries.push({
          path: entryPath,
          type: entryPath.endsWith("/") ? "directory" : "file",
          compressedSize: entry.compressedSize,
          uncompressedSize: entry.uncompressedSize
        });
      }

      zipFile.readEntry();
    });

    zipFile.once("end", () => {
      zipFile.close();
      resolve(entries);
    });

    zipFile.once("error", (error) => {
      zipFile.close();
      reject(error);
    });

    zipFile.readEntry();
  });
}

async function drainEntryStream(
  zipFile: yauzl.ZipFile,
  entry: yauzl.Entry
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    zipFile.openReadStream(entry, async (error, stream) => {
      if (error) {
        reject(error);
        return;
      }

      if (!stream) {
        reject(
          new BRUtilsError(`Could not read archive entry: ${entry.fileName}`)
        );
        return;
      }

      try {
        await pipeline(
          stream,
          new Writable({
            write(_chunk, _encoding, callback) {
              callback();
            }
          })
        );

        resolve();
      } catch (streamError) {
        reject(streamError);
      }
    });
  });
}

export async function testZipArchive(
  sourcePath: string,
  options: ZipTestOptions = {}
): Promise<ZipTestResult> {
  const zipFile = await openZipFile(sourcePath);
  let testedEntries = 0;

  return new Promise((resolve, reject) => {
    zipFile.on("entry", (entry) => {
      const entryPath = normalizeEntryPath(entry.fileName);

      void (async () => {
        try {
          if (
            !shouldIncludeEntry(entryPath, options.match) ||
            entryPath.endsWith("/")
          ) {
            zipFile.readEntry();
            return;
          }

          await drainEntryStream(zipFile, entry);
          testedEntries += 1;
          zipFile.readEntry();
        } catch (error) {
          zipFile.close();
          reject(error);
        }
      })();
    });

    zipFile.once("end", () => {
      zipFile.close();
      resolve({
        sourcePath: path.resolve(sourcePath),
        testedEntries,
        ok: true
      });
    });

    zipFile.once("error", (error) => {
      zipFile.close();
      reject(error);
    });

    zipFile.readEntry();
  });
}
