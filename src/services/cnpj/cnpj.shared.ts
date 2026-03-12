import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { onlyDigits } from "../../core/utils/digits.js";
export function normalizeCNPJ(value: string): string {
  return onlyDigits(value);
}
export function stripCNPJ(value: string): string {
  return normalizeCNPJ(value);
}
export function ensureCNPJLength(value: string): string {
  const digits = normalizeCNPJ(value);
  if (digits.length !== 14)
    throw new BRUtilsError("CNPJ must contain exactly 14 digits.");
  return digits;
}
export function normalizeCNPJBranch(value?: string): string {
  const branch = normalizeCNPJ(value ?? "0001");
  if (!/^\d{1,4}$/.test(branch))
    throw new BRUtilsError("Branch must contain between 1 and 4 digits.");
  return branch.padStart(4, "0");
}
export function calculateCNPJCheckDigit(digits: number[]): number {
  const weights =
    digits.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index]!,
    0
  );
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}
export function resolveCNPJBranch(value: string): string | undefined {
  const digits = normalizeCNPJ(value);
  return digits.length < 12 ? undefined : digits.slice(8, 12);
}
