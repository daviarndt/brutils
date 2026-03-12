import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { formatCPF } from "../../core/utils/format.js";
import { randomDigit, randomDigits } from "../../core/utils/random.js";
import { calculateCPFCheckDigit, resolveCPFRegionDigit } from "./cpf.shared.js";
import type {
  CPFGenerateBatchOptions,
  CPFGenerateOptions
} from "./cpf.types.js";
export function generateCPF(options: CPFGenerateOptions = {}): string {
  const firstEightDigits = randomDigits(8);
  const regionDigit = resolveCPFRegionDigit(options.state) ?? randomDigit();
  const baseDigits = [...firstEightDigits, regionDigit];
  const firstCheckDigit = calculateCPFCheckDigit(baseDigits);
  const secondCheckDigit = calculateCPFCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);
  const cpf = [...baseDigits, firstCheckDigit, secondCheckDigit].join("");
  return options.formatted ? formatCPF(cpf) : cpf;
}
export function generateCPFBatch(options: CPFGenerateBatchOptions): string[] {
  const count = options.count;
  if (!Number.isInteger(count) || count <= 0)
    throw new BRUtilsError("Count must be a positive integer.");
  if (!options.unique)
    return Array.from({ length: count }, () =>
      generateCPF({ formatted: options.formatted, state: options.state })
    );
  const seen = new Set<string>();
  const values: string[] = [];
  while (values.length < count) {
    const value = generateCPF({
      formatted: options.formatted,
      state: options.state
    });
    if (!seen.has(value)) {
      seen.add(value);
      values.push(value);
    }
  }
  return values;
}
