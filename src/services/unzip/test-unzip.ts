import path from "node:path";
import { testZipArchive } from "../archive/zip-archive.js";
import type { UnzipTestResult } from "./unzip.types.js";

export async function testUnzip(
  sourcePath: string,
  match?: string
): Promise<UnzipTestResult> {
  return testZipArchive(path.resolve(sourcePath), match ? { match } : {});
}
