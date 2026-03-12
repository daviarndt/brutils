import { allDigitsEqual } from "../../core/utils/digits.js";
import { formatCPF } from "../../core/utils/format.js";
import {
  calculateCPFCheckDigit,
  normalizeCPF,
  resolveCPFStateFromDigits
} from "./cpf.shared.js";
import type { CPFValidateOptions, CPFValidationResult } from "./cpf.types.js";
export function validateCPF(
  value: string,
  options: CPFValidateOptions = {}
): CPFValidationResult {
  const digits = normalizeCPF(value);
  if (digits.length !== 11) return { isValid: false, value: digits };
  if (options.strict && allDigitsEqual(digits))
    return { isValid: false, value: digits, formatted: formatCPF(digits) };
  const baseDigits = digits.slice(0, 9).split("").map(Number);
  const firstCheckDigit = calculateCPFCheckDigit(baseDigits);
  const secondCheckDigit = calculateCPFCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);
  const expectedCPF = [...baseDigits, firstCheckDigit, secondCheckDigit].join(
    ""
  );
  return {
    isValid: digits === expectedCPF,
    value: digits,
    formatted: formatCPF(digits),
    state: resolveCPFStateFromDigits(digits)
  };
}
