import type {
  ZipArchiveEntryInfo,
  ZipTestResult
} from "../archive/zip-archive.types.js";

export interface ZipCommandOptions {
  out?: string;
  level?: number;
  force?: boolean;
  exclude?: string[];
  contentsOnly?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  quiet?: boolean;
  followSymlinks?: boolean;
  store?: boolean;
}

export interface ZipExecutionPlan {
  sourcePath: string;
  outputPath: string;
  sourceType: "file" | "directory";
  exclude: string[];
  contentsOnly: boolean;
  level: number;
  followSymlinks: boolean;
  store: boolean;
}

export interface ZipInputEntry {
  type: "file" | "directory";
  sourcePath: string;
  entryName: string;
}

export type ZipListResult = ZipArchiveEntryInfo[];
export type ZipTestExecutionResult = ZipTestResult;
