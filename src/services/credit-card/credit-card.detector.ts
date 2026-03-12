import { onlyDigits } from "../../core/utils/digits.js";
import {
  CREDIT_CARD_BRAND_LENGTHS,
  CREDIT_CARD_BRAND_PREFIXES
} from "./credit-card.constants.js";
import type { CreditCardBrand } from "./credit-card.types.js";

export function detectCreditCardBrand(
  number: string
): CreditCardBrand | "unknown" {
  const digits = onlyDigits(number);

  const brands = Object.keys(CREDIT_CARD_BRAND_PREFIXES) as CreditCardBrand[];

  for (const brand of brands) {
    const prefixes = CREDIT_CARD_BRAND_PREFIXES[brand];
    const lengths = CREDIT_CARD_BRAND_LENGTHS[brand];

    const matchesPrefix = prefixes.some((prefix) => digits.startsWith(prefix));
    const matchesLength = lengths.includes(digits.length);

    if (matchesPrefix && matchesLength) {
      return brand;
    }
  }

  return "unknown";
}
