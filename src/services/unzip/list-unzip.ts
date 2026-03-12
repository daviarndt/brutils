import path from "node:path";
import { listZipArchiveEntries } from "../archive/zip-archive.js";
import type { UnzipListResult } from "./unzip.types.js";

export async function listUnzip(
  sourcePath: string,
  match?: string
): Promise<UnzipListResult> {
  return listZipArchiveEntries(
    path.resolve(sourcePath),
    match ? { match } : {}
  );
}
