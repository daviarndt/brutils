export interface ZipCommandOptions {
  out?: string;
  level?: number;
  force?: boolean;
  exclude?: string[];
  contentsOnly?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  quiet?: boolean;
}

export interface ZipExecutionPlan {
  sourcePath: string;
  outputPath: string;
  sourceType: "file" | "directory";
  exclude: string[];
  contentsOnly: boolean;
  level: number;
}

export interface ZipInputEntry {
  type: "file" | "directory";
  sourcePath: string;
  entryName: string;
}
