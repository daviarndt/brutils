import { describe, expect, it } from "vitest";
import { pickRandomNumber } from "../../src/services/number-picker/number-picker.service.js";

describe("pickRandomNumber", () => {
  it("should generate a number within the provided range", () => {
    const result = pickRandomNumber({
      min: 1,
      max: 100,
      seed: 50
    });

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("should generate an integer", () => {
    const result = pickRandomNumber({
      min: 1,
      max: 100,
      seed: 12
    });

    expect(Number.isInteger(result)).toBe(true);
  });

  it("should be deterministic when a seed is provided", () => {
    expect(pickRandomNumber({ min: 1, max: 100, seed: 9 })).toBe(
      pickRandomNumber({ min: 1, max: 100, seed: 9 })
    );
  });

  it("should throw when min is greater than max", () => {
    expect(() =>
      pickRandomNumber({
        min: 100,
        max: 1
      })
    ).toThrow();
  });
});
