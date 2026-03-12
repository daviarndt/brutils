import type { ValidationResult } from "../../core/types/common.types.js";
export type CEPStateCode =
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
export interface CEPGenerateOptions {
  formatted?: boolean | undefined;
  state?: CEPStateCode | undefined;
}
export interface CEPGenerateBatchOptions extends CEPGenerateOptions {
  count: number;
}
export interface CEPValidateOptions {
  strict?: boolean | undefined;
}
export interface CEPValidationResult extends ValidationResult {
  stateBias?: CEPStateCode | undefined;
}
export interface CEPMaskOptions {
  pattern?: string | undefined;
}
