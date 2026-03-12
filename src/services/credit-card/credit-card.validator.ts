import { onlyDigits } from "../../core/utils/digits.js";
import {
  CREDIT_CARD_BRAND_CVV_LENGTH,
  CREDIT_CARD_BRAND_LENGTHS
} from "./credit-card.constants.js";
import { detectCreditCardBrand } from "./credit-card.detector.js";
import type {
  CreditCardValidationInput,
  CreditCardValidationResult
} from "./credit-card.types.js";

function isValidLuhn(number: string): boolean {
  const digits = onlyDigits(number);

  let sum = 0;
  let shouldDouble = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function isValidExpiry(
  expiryMonth?: string,
  expiryYear?: string,
  expiry?: string
): boolean {
  let month = expiryMonth;
  let year = expiryYear;

  if ((!month || !year) && expiry) {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) {
      return false;
    }

    month = match[1];
    year = match[2];
  }

  if (!month || !year) {
    return false;
  }

  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (monthNumber < 1 || monthNumber > 12) {
    return false;
  }

  const now = new Date();
  const currentYear = Number(String(now.getFullYear()).slice(-2));
  const currentMonth = now.getMonth() + 1;

  if (yearNumber > currentYear) {
    return true;
  }

  if (yearNumber === currentYear && monthNumber >= currentMonth) {
    return true;
  }

  return false;
}

function isValidCVV(brand: string, cvv?: string): boolean {
  if (!cvv) {
    return false;
  }

  const digits = onlyDigits(cvv);

  if (brand === "unknown") {
    return digits.length >= 3 && digits.length <= 4;
  }

  const expectedLength =
    CREDIT_CARD_BRAND_CVV_LENGTH[
      brand as keyof typeof CREDIT_CARD_BRAND_CVV_LENGTH
    ];

  return digits.length === expectedLength;
}

export function validateCreditCard(
  input: CreditCardValidationInput
): CreditCardValidationResult {
  const number = onlyDigits(input.number);
  const brand = detectCreditCardBrand(number);
  const numberValid =
    brand !== "unknown" &&
    CREDIT_CARD_BRAND_LENGTHS[brand].includes(number.length) &&
    isValidLuhn(number);

  const expiryValid = isValidExpiry(
    input.expiryMonth,
    input.expiryYear,
    input.expiry
  );

  const cvvValid = isValidCVV(brand, input.cvv);

  return {
    isValid: numberValid && expiryValid && cvvValid,
    brand,
    number,
    numberValid,
    expiryValid,
    cvvValid
  };
}
