export const BRAZILIAN_STATES = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO"
] as const;

export const CARD_BRANDS = ["visa", "mastercard", "amex", "elo"] as const;

export const RANDOM_OUTPUT_FORMATS = ["plain", "json", "csv"] as const;

export const STRING_CASE_STYLES = [
  "camel",
  "snake",
  "kebab",
  "pascal",
  "constant",
  "title"
] as const;

export const STRING_CODEC_MODES = ["encode", "decode"] as const;

export const STRING_PAD_SIDES = ["left", "right", "both"] as const;

export type RandomOutputFormat = (typeof RANDOM_OUTPUT_FORMATS)[number];
export type StringCaseStyleOption = (typeof STRING_CASE_STYLES)[number];
export type StringCodecModeOption = (typeof STRING_CODEC_MODES)[number];
export type StringPadSideOption = (typeof STRING_PAD_SIDES)[number];
