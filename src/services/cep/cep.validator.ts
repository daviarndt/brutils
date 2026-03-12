import { allDigitsEqual } from "../../core/utils/digits.js";
import { formatCEP } from "../../core/utils/format.js";
import { normalizeCEP } from "./cep.shared.js";
import type { CEPValidateOptions, CEPValidationResult } from "./cep.types.js";
export function validateCEP(
  value: string,
  options: CEPValidateOptions = {}
): CEPValidationResult {
  const digits = normalizeCEP(value);
  const hasValidLength = digits.length === 8;
  const passesStrictRules = !options.strict || !allDigitsEqual(digits);
  return {
    isValid: hasValidLength && passesStrictRules,
    value: digits,
    formatted: hasValidLength ? formatCEP(digits) : undefined
  };
}
