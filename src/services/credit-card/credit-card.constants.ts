import type { CreditCardBrand } from "./credit-card.types.js";

export const CREDIT_CARD_BRAND_PREFIXES: Record<CreditCardBrand, string[]> = {
  visa: ["4"],
  mastercard: ["51", "52", "53", "54", "55"],
  amex: ["34", "37"],
  elo: [
    "401178",
    "401179",
    "431274",
    "438935",
    "451416",
    "457393",
    "457631",
    "457632",
    "504175",
    "627780",
    "636297",
    "636368"
  ]
};

export const CREDIT_CARD_BRAND_LENGTHS: Record<CreditCardBrand, number[]> = {
  visa: [16],
  mastercard: [16],
  amex: [15],
  elo: [16]
};

export const CREDIT_CARD_BRAND_CVV_LENGTH: Record<CreditCardBrand, number> = {
  visa: 3,
  mastercard: 3,
  amex: 4,
  elo: 3
};
