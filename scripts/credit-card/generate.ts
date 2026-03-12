import { generateCreditCard } from "../../src/services/credit-card/credit-card.generator.js";
import type { CreditCardBrand } from "../../src/services/credit-card/credit-card.types.js";

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 ? process.argv[index + 1] : undefined;
}

const brand = getArgValue("--brand") as CreditCardBrand | undefined;
const formatted = process.argv.includes("--formatted");

const result = generateCreditCard({
  brand,
  formatted
});

console.log(result);
