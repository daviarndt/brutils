import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { formatCEP } from "../../core/utils/format.js";
import { randomDigit, randomDigits } from "../../core/utils/random.js";
import { resolveCEPLeadingDigits } from "./cep.shared.js";
import type {
  CEPGenerateBatchOptions,
  CEPGenerateOptions
} from "./cep.types.js";
export function generateCEP(options: CEPGenerateOptions = {}): string {
  const stateLeadingDigits = resolveCEPLeadingDigits(options.state);
  const firstDigit = stateLeadingDigits
    ? stateLeadingDigits[Math.floor(Math.random() * stateLeadingDigits.length)]!
    : randomDigit();
  const digits = [firstDigit, ...randomDigits(7)].join("");
  return options.formatted ? formatCEP(digits) : digits;
}
export function generateCEPBatch(options: CEPGenerateBatchOptions): string[] {
  const count = options.count;
  if (!Number.isInteger(count) || count <= 0)
    throw new BRUtilsError("Count must be a positive integer.");
  return Array.from({ length: count }, () =>
    generateCEP({ formatted: options.formatted, state: options.state })
  );
}
