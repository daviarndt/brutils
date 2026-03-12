import { describe, expect, it } from "vitest";
import { validateCreditCard } from "../../src/services/credit-card/credit-card.validator.js";

describe("validateCreditCard", () => {
  it("should validate a full visa card payload", () => {
    const result = validateCreditCard({
      number: "4111111111111111",
      expiry: "12/30",
      cvv: "123"
    });

    expect(result.isValid).toBe(true);
    expect(result.brand).toBe("visa");
  });

  it("should invalidate an incorrect card number", () => {
    const result = validateCreditCard({
      number: "4111111111111112",
      expiry: "12/30",
      cvv: "123"
    });

    expect(result.numberValid).toBe(false);
    expect(result.isValid).toBe(false);
  });

  it("should invalidate an expired card", () => {
    const result = validateCreditCard({
      number: "4111111111111111",
      expiry: "01/20",
      cvv: "123"
    });

    expect(result.expiryValid).toBe(false);
    expect(result.isValid).toBe(false);
  });

  it("should invalidate a visa card with invalid cvv", () => {
    const result = validateCreditCard({
      number: "4111111111111111",
      expiry: "12/30",
      cvv: "1234"
    });

    expect(result.cvvValid).toBe(false);
    expect(result.isValid).toBe(false);
  });

  it("should validate an amex card with 4-digit cvv", () => {
    const result = validateCreditCard({
      number: "340000000000009",
      expiry: "12/30",
      cvv: "1234"
    });

    expect(result.brand).toBe("amex");
    expect(result.isValid).toBe(true);
  });
});
