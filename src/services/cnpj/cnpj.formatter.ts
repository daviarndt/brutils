import { formatCNPJ } from "../../core/utils/format.js";
import { ensureCNPJLength, stripCNPJ } from "./cnpj.shared.js";
export function formatCNPJValue(value: string): string {
  return formatCNPJ(ensureCNPJLength(value));
}
export { stripCNPJ };
