import { applyDigitMask } from "../../core/utils/mask.js";
import { ensureCNPJLength } from "./cnpj.shared.js";
import type { CNPJMaskOptions } from "./cnpj.types.js";
const DEFAULT_CNPJ_MASK_PATTERN = "**.***.***/****-##";
export function maskCNPJ(value: string, options: CNPJMaskOptions = {}): string {
  return applyDigitMask(
    ensureCNPJLength(value),
    options.pattern ?? DEFAULT_CNPJ_MASK_PATTERN
  );
}
