import { describe, expect, it } from "vitest";
import { generateRandomNumbers } from "../../src/services/random-number/random-number.generator.js";

describe("generateRandomNumbers", () => {
  it("should generate one random number by default", () => {
    const result = generateRandomNumbers();

    expect(result).toHaveLength(1);
    expect(Number.isInteger(result[0])).toBe(true);
  });

  it("should generate numbers within the provided range", () => {
    const result = generateRandomNumbers({
      min: 1,
      max: 100,
      count: 20
    });

    expect(result).toHaveLength(20);
    expect(result.every((value) => value >= 1 && value <= 100)).toBe(true);
  });

  it("should generate sorted numbers when sorted is true", () => {
    const result = generateRandomNumbers({
      min: 1,
      max: 100,
      count: 20,
      sorted: true
    });

    const sortedCopy = [...result].sort((a, b) => a - b);

    expect(result).toEqual(sortedCopy);
  });

  it("should generate unique numbers when unique is true", () => {
    const result = generateRandomNumbers({
      min: 1,
      max: 100,
      count: 20,
      unique: true
    });

    const uniqueValues = new Set(result);

    expect(uniqueValues.size).toBe(result.length);
  });

  it("should throw when min is greater than max", () => {
    expect(() =>
      generateRandomNumbers({
        min: 10,
        max: 1
      })
    ).toThrow();
  });

  it("should throw when count is invalid", () => {
    expect(() =>
      generateRandomNumbers({
        count: 0
      })
    ).toThrow();
  });

  it("should throw when unique count exceeds range size", () => {
    expect(() =>
      generateRandomNumbers({
        min: 1,
        max: 5,
        count: 10,
        unique: true
      })
    ).toThrow();
  });
});