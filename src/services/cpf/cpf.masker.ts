import { applyDigitMask } from "../../core/util/mask.js";
import { ensureCPFLength } from "./cpf.shared.js";
import type { CPFMaskOptions } from "./cpf.types.js";
const DEFAULT_CPF_MASK_PATTERN = "***.***.***-##";
export function maskCPF(value: string, options: CPFMaskOptions = {}): string {
  return applyDigitMask(
    ensureCPFLength(value),
    options.pattern ?? DEFAULT_CPF_MASK_PATTERN
  );
}
