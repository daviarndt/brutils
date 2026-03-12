import { validateCreditCard } from "../../src/services/credit-card/credit-card.validator.js";

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 ? process.argv[index + 1] : undefined;
}

const number = getArgValue("--number");
const expiry = getArgValue("--expiry");
const cvv = getArgValue("--cvv");

if (!number || !expiry || !cvv) {
  console.error(
    "Usage: npm run credit-card:validate -- --number <number> --expiry <MM/YY> --cvv <cvv>"
  );
  process.exit(1);
}

console.log(
  validateCreditCard({
    number,
    expiry,
    cvv
  })
);
