export type StringCaseStyle =
  | "camel"
  | "snake"
  | "kebab"
  | "pascal"
  | "constant"
  | "title";

export type StringCodecMode = "encode" | "decode";

export type StringPadSide = "left" | "right" | "both";

export interface TruncateTextOptions {
  max: number;
  suffix?: string;
}

export interface ReplaceTextOptions {
  from: string;
  with: string;
  regex?: boolean;
}

export interface PadTextOptions {
  length: number;
  side?: StringPadSide;
}

export interface ExtractTextOptions {
  regex?: boolean;
}
