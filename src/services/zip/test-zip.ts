import path from "node:path";
import { testZipArchive } from "../archive/zip-archive.js";
import type { ZipTestExecutionResult } from "./zip.types.js";

export async function testZip(
  sourcePath: string,
  match?: string
): Promise<ZipTestExecutionResult> {
  return testZipArchive(path.resolve(sourcePath), match ? { match } : {});
}
