export type RandomNumberOutputFormat = "plain" | "json" | "csv";

export interface RandomNumberGenerateOptions {
  min?: number;
  max?: number;
  count?: number;
  sorted?: boolean;
  unique?: boolean;
  format?: RandomNumberOutputFormat;
}

export type RandomNumberGenerateResult = number[];
