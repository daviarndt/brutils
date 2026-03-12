import { detectCreditCardBrand } from "../../src/services/credit-card/credit-card.detector.js";

const number = process.argv[2];

if (!number) {
  console.error("Usage: npm run credit-card:detect -- <card-number>");
  process.exit(1);
}

console.log(detectCreditCardBrand(number));
