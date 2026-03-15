export interface JsonValidationResult {
  isValid: boolean;
  error?: string;
}

export interface JsonDiffEntry {
  path: string;
  type: "added" | "removed" | "changed";
  left?: unknown;
  right?: unknown;
}

export interface JsonDiffResult {
  isEqual: boolean;
  changes: JsonDiffEntry[];
}
