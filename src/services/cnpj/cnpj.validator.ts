import { allDigitsEqual } from "../../core/utils/digits.js";
import { formatCNPJ } from "../../core/utils/format.js";
import {
  calculateCNPJCheckDigit,
  normalizeCNPJ,
  resolveCNPJBranch
} from "./cnpj.shared.js";
import type {
  CNPJValidateOptions,
  CNPJValidationResult
} from "./cnpj.types.js";
export function validateCNPJ(
  value: string,
  options: CNPJValidateOptions = {}
): CNPJValidationResult {
  const digits = normalizeCNPJ(value);
  if (digits.length !== 14) return { isValid: false, value: digits };
  if (options.strict && allDigitsEqual(digits))
    return {
      isValid: false,
      value: digits,
      formatted: formatCNPJ(digits),
      branch: resolveCNPJBranch(digits)
    };
  const baseDigits = digits.slice(0, 12).split("").map(Number);
  const firstCheckDigit = calculateCNPJCheckDigit(baseDigits);
  const secondCheckDigit = calculateCNPJCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);
  const expectedCNPJ = [...baseDigits, firstCheckDigit, secondCheckDigit].join(
    ""
  );
  return {
    isValid: digits === expectedCNPJ,
    value: digits,
    formatted: formatCNPJ(digits),
    branch: resolveCNPJBranch(digits)
  };
}
