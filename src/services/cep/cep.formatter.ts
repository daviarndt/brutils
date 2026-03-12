import { formatCEP } from "../../core/utils/format.js";
import { ensureCEPLength, stripCEP } from "./cep.shared.js";
export function formatCEPValue(value: string): string {
  return formatCEP(ensureCEPLength(value));
}
export { stripCEP };
