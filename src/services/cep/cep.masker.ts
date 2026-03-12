import { applyDigitMask } from "../../core/utils/mask.js";
import { ensureCEPLength } from "./cep.shared.js";
import type { CEPMaskOptions } from "./cep.types.js";
const DEFAULT_CEP_MASK_PATTERN = "*****-###";
export function maskCEP(value: string, options: CEPMaskOptions = {}): string {
  return applyDigitMask(
    ensureCEPLength(value),
    options.pattern ?? DEFAULT_CEP_MASK_PATTERN
  );
}
