export type CreditCardBrand = "visa" | "mastercard" | "amex" | "elo";

export interface CreditCardGenerateOptions {
  brand?: CreditCardBrand;
  formatted?: boolean;
  expiryYearsAhead?: number;
}

export interface CreditCardData {
  brand: CreditCardBrand;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  expiry: string;
  cvv: string;
}

export interface CreditCardValidationInput {
  number: string;
  expiryMonth?: string;
  expiryYear?: string;
  expiry?: string;
  cvv?: string;
}

export interface CreditCardValidationResult {
  isValid: boolean;
  brand: CreditCardBrand | "unknown";
  number: string;
  numberValid: boolean;
  expiryValid: boolean;
  cvvValid: boolean;
}
