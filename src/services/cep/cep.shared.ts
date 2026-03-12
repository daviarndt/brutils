import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { onlyDigits } from "../../core/utils/digits.js";
import type { CEPStateCode } from "./cep.types.js";
const CEP_STATE_LEADING_DIGIT_MAP: Record<CEPStateCode, number[]> = {
  AC: [6],
  AL: [5],
  AM: [6],
  AP: [6],
  BA: [4],
  CE: [6],
  DF: [7],
  ES: [2],
  GO: [7],
  MA: [6],
  MG: [3],
  MS: [7],
  MT: [7],
  PA: [6],
  PB: [5],
  PE: [5],
  PI: [6],
  PR: [8],
  RJ: [2],
  RN: [5],
  RO: [7],
  RR: [6],
  RS: [9],
  SC: [8],
  SE: [4],
  SP: [0, 1],
  TO: [7]
};
export function normalizeCEP(value: string): string {
  return onlyDigits(value);
}
export function stripCEP(value: string): string {
  return normalizeCEP(value);
}
export function ensureCEPLength(value: string): string {
  const digits = normalizeCEP(value);
  if (digits.length !== 8)
    throw new BRUtilsError("CEP must contain exactly 8 digits.");
  return digits;
}
export function resolveCEPLeadingDigits(
  state?: CEPStateCode
): number[] | undefined {
  return state ? CEP_STATE_LEADING_DIGIT_MAP[state] : undefined;
}
