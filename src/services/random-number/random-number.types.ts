export type RandomNumberOutputFormat = "plain" | "json" | "csv";

export interface RandomBaseOptions {
  seed?: number;
  format?: RandomNumberOutputFormat;
}

export interface RandomIntegerGenerateOptions extends RandomBaseOptions {
  min?: number;
  max?: number;
  count?: number;
  sorted?: boolean;
  unique?: boolean;
}

export interface RandomFloatGenerateOptions extends RandomBaseOptions {
  min?: number;
  max?: number;
  count?: number;
  sorted?: boolean;
  precision?: number;
}

export interface RandomPickOptions extends RandomBaseOptions {
  items: string[];
  count?: number;
  unique?: boolean;
}

export interface RandomShuffleOptions extends RandomBaseOptions {
  items: string[];
}

export interface DiceRollOptions extends RandomBaseOptions {
  faces?: number;
  count?: number;
}

export interface CoinFlipOptions extends RandomBaseOptions {
  seed?: number;
}

export type RandomNumberGenerateOptions = RandomIntegerGenerateOptions;
export type RandomNumberGenerateResult = number[];
