export interface ZipArchiveEntryInfo {
  path: string;
  type: "file" | "directory";
  compressedSize: number;
  uncompressedSize: number;
}

export interface ZipListOptions {
  match?: string;
}

export interface ZipTestOptions {
  match?: string;
}

export interface ZipTestResult {
  sourcePath: string;
  testedEntries: number;
  ok: boolean;
}
