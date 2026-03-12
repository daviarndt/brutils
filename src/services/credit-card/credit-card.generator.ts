import { onlyDigits } from "../../core/utils/digits.js";
import { pickRandomItem } from "../../core/utils/array.js";
import { randomDigit } from "../../core/utils/random.js";
import {
  CREDIT_CARD_BRAND_CVV_LENGTH,
  CREDIT_CARD_BRAND_LENGTHS,
  CREDIT_CARD_BRAND_PREFIXES
} from "./credit-card.constants.js";
import type {
  CreditCardBrand,
  CreditCardData,
  CreditCardGenerateOptions
} from "./credit-card.types.js";

function generateRandomNumericString(length: number): string {
  return Array.from({ length }, () => String(randomDigit())).join("");
}

function formatCreditCardNumber(value: string): string {
  return onlyDigits(value)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

function calculateLuhnCheckDigit(partialNumber: string): number {
  const digits = partialNumber.split("").map(Number).reverse();

  const sum = digits.reduce((accumulator, digit, index) => {
    if (index % 2 === 0) {
      const doubled = digit * 2;
      return accumulator + (doubled > 9 ? doubled - 9 : doubled);
    }

    return accumulator + digit;
  }, 0);

  return (10 - (sum % 10)) % 10;
}

function generateCardNumber(brand: CreditCardBrand): string {
  const prefixes = CREDIT_CARD_BRAND_PREFIXES[brand];
  const lengths = CREDIT_CARD_BRAND_LENGTHS[brand];

  const prefix = pickRandomItem(prefixes);
  const totalLength = pickRandomItem(lengths);

  const bodyLength = totalLength - prefix.length - 1;

  const partialNumber = prefix + generateRandomNumericString(bodyLength);
  const checkDigit = calculateLuhnCheckDigit(partialNumber);

  return partialNumber + String(checkDigit);
}

function generateExpiry(expiryYearsAhead = 5): {
  expiryMonth: string;
  expiryYear: string;
  expiry: string;
} {
  const now = new Date();
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const futureYear =
    now.getFullYear() +
    Math.floor(Math.random() * Math.max(expiryYearsAhead, 1)) +
    1;

  const yearTwoDigits = String(futureYear).slice(-2);

  return {
    expiryMonth: month,
    expiryYear: yearTwoDigits,
    expiry: `${month}/${yearTwoDigits}`
  };
}

function generateCVV(brand: CreditCardBrand): string {
  const length = CREDIT_CARD_BRAND_CVV_LENGTH[brand];
  return generateRandomNumericString(length);
}

export function generateCreditCard(
  options: CreditCardGenerateOptions = {}
): CreditCardData {
  const brand = options.brand ?? "visa";
  const rawNumber = generateCardNumber(brand);
  const number = options.formatted
    ? formatCreditCardNumber(rawNumber)
    : rawNumber;
  const { expiryMonth, expiryYear, expiry } = generateExpiry(
    options.expiryYearsAhead
  );
  const cvv = generateCVV(brand);

  return {
    brand,
    number,
    expiryMonth,
    expiryYear,
    expiry,
    cvv
  };
}
