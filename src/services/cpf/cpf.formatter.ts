import { formatCPF } from "../../core/utils/format.js";
import { ensureCPFLength, stripCPF } from "./cpf.shared.js";
export function formatCPFValue(value: string): string {
  return formatCPF(ensureCPFLength(value));
}
export { stripCPF };
