import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { onlyDigits } from "../../core/utils/digits.js";
import type { CPFStateCode } from "./cpf.types.js";
const CPF_STATE_REGION_MAP: Record<CPFStateCode, number> = {
  AC: 2,
  AL: 4,
  AM: 2,
  AP: 2,
  BA: 5,
  CE: 3,
  DF: 1,
  ES: 7,
  GO: 1,
  MA: 3,
  MG: 6,
  MS: 1,
  MT: 1,
  PA: 2,
  PB: 4,
  PE: 4,
  PI: 3,
  PR: 9,
  RJ: 7,
  RN: 4,
  RO: 2,
  RR: 2,
  RS: 0,
  SC: 9,
  SE: 5,
  SP: 8,
  TO: 1
};
const REGION_TO_STATE: Record<number, CPFStateCode> = {
  0: "RS",
  1: "DF",
  2: "AC",
  3: "CE",
  4: "AL",
  5: "BA",
  6: "MG",
  7: "RJ",
  8: "SP",
  9: "PR"
};
export function normalizeCPF(value: string): string {
  return onlyDigits(value);
}
export function stripCPF(value: string): string {
  return normalizeCPF(value);
}
export function ensureCPFLength(value: string): string {
  const digits = normalizeCPF(value);
  if (digits.length !== 11)
    throw new BRUtilsError("CPF must contain exactly 11 digits.");
  return digits;
}
export function calculateCPFCheckDigit(digits: number[]): number {
  const factorStart = digits.length + 1;
  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * (factorStart - index),
    0
  );
  const remainder = (sum * 10) % 11;
  return remainder === 10 ? 0 : remainder;
}
export function resolveCPFRegionDigit(
  state?: CPFStateCode
): number | undefined {
  return state ? CPF_STATE_REGION_MAP[state] : undefined;
}
export function resolveCPFStateFromDigits(
  value: string
): CPFStateCode | undefined {
  const digits = normalizeCPF(value);
  if (digits.length < 9) return undefined;
  return REGION_TO_STATE[Number(digits[8])];
}
