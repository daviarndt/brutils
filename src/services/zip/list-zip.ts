import path from "node:path";
import { listZipArchiveEntries } from "../archive/zip-archive.js";
import type { ZipListResult } from "./zip.types.js";

export async function listZip(
  sourcePath: string,
  match?: string
): Promise<ZipListResult> {
  return listZipArchiveEntries(
    path.resolve(sourcePath),
    match ? { match } : {}
  );
}
