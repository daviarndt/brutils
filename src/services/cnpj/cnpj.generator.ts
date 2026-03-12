import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { formatCNPJ } from "../../core/utils/format.js";
import { randomDigits } from "../../core/utils/random.js";
import { calculateCNPJCheckDigit, normalizeCNPJBranch } from "./cnpj.shared.js";
import type {
  CNPJGenerateBatchOptions,
  CNPJGenerateOptions
} from "./cnpj.types.js";
export function generateCNPJ(options: CNPJGenerateOptions = {}): string {
  const rootDigits = randomDigits(8);
  const branchDigits = normalizeCNPJBranch(options.branch)
    .split("")
    .map(Number);
  const baseDigits = [...rootDigits, ...branchDigits];
  const firstCheckDigit = calculateCNPJCheckDigit(baseDigits);
  const secondCheckDigit = calculateCNPJCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);
  const cnpj = [...baseDigits, firstCheckDigit, secondCheckDigit].join("");
  return options.formatted ? formatCNPJ(cnpj) : cnpj;
}
export function generateCNPJBatch(options: CNPJGenerateBatchOptions): string[] {
  const count = options.count;
  if (!Number.isInteger(count) || count <= 0)
    throw new BRUtilsError("Count must be a positive integer.");
  if (!options.unique)
    return Array.from({ length: count }, () =>
      generateCNPJ({ formatted: options.formatted, branch: options.branch })
    );
  const seen = new Set<string>();
  const values: string[] = [];
  while (values.length < count) {
    const value = generateCNPJ({
      formatted: options.formatted,
      branch: options.branch
    });
    if (!seen.has(value)) {
      seen.add(value);
      values.push(value);
    }
  }
  return values;
}
