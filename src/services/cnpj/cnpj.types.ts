import type { ValidationResult } from "../../core/types/common.types.js";
export interface CNPJGenerateOptions {
  formatted?: boolean | undefined;
  branch?: string | undefined;
}
export interface CNPJGenerateBatchOptions extends CNPJGenerateOptions {
  count: number;
  unique?: boolean | undefined;
}
export interface CNPJValidateOptions {
  strict?: boolean | undefined;
}
export interface CNPJValidationResult extends ValidationResult {
  branch?: string | undefined;
}
export interface CNPJMaskOptions {
  pattern?: string | undefined;
}
