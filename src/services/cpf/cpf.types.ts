import type { ValidationResult } from "../../core/types/common.types.js";
export type CPFStateCode =
  | "AC"
  | "AL"
  | "AM"
  | "AP"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MG"
  | "MS"
  | "MT"
  | "PA"
  | "PB"
  | "PE"
  | "PI"
  | "PR"
  | "RJ"
  | "RN"
  | "RO"
  | "RR"
  | "RS"
  | "SC"
  | "SE"
  | "SP"
  | "TO";
export interface CPFGenerateOptions {
  formatted?: boolean | undefined;
  state?: CPFStateCode | undefined;
}
export interface CPFGenerateBatchOptions extends CPFGenerateOptions {
  count: number;
  unique?: boolean | undefined;
}
export interface CPFValidateOptions {
  strict?: boolean | undefined;
}
export interface CPFValidationResult extends ValidationResult {
  state?: CPFStateCode | undefined;
}
export interface CPFMaskOptions {
  pattern?: string | undefined;
}
