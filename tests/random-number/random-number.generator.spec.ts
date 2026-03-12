import { describe, expect, it } from "vitest";
import {
  flipCoin,
  generateRandomFloats,
  generateRandomIntegers,
  generateRandomNumbers,
  pickRandomItems,
  rollDice,
  shuffleRandomItems
} from "../../src/services/random-number/random-number.generator.js";

describe("random number utilities", () => {
  it("should generate one random integer by default", () => {
    const result = generateRandomNumbers({ seed: 10 });

    expect(result).toHaveLength(1);
    expect(Number.isInteger(result[0])).toBe(true);
  });

  it("should generate deterministic integers with a seed", () => {
    const first = generateRandomIntegers({
      min: 1,
      max: 10,
      count: 5,
      seed: 42
    });
    const second = generateRandomIntegers({
      min: 1,
      max: 10,
      count: 5,
      seed: 42
    });

    expect(first).toEqual(second);
  });

  it("should generate sorted unique integers", () => {
    const result = generateRandomIntegers({
      min: 1,
      max: 100,
      count: 20,
      seed: 1,
      sorted: true,
      unique: true
    });

    expect(result).toEqual([...result].sort((a, b) => a - b));
    expect(new Set(result).size).toBe(result.length);
  });

  it("should generate floats with the requested precision", () => {
    const result = generateRandomFloats({
      min: 1,
      max: 2,
      count: 3,
      precision: 2,
      seed: 99
    });

    expect(result).toHaveLength(3);
    expect(result.every((value) => value >= 1 && value <= 2)).toBe(true);
    expect(result.every((value) => Number(value.toFixed(2)) === value)).toBe(
      true
    );
  });

  it("should pick items from a list", () => {
    const result = pickRandomItems({
      items: ["a", "b", "c"],
      count: 2,
      seed: 5,
      unique: true
    });

    expect(result).toHaveLength(2);
    expect(new Set(result).size).toBe(2);
    expect(result.every((value) => ["a", "b", "c"].includes(value))).toBe(true);
  });

  it("should shuffle items deterministically with a seed", () => {
    const first = shuffleRandomItems({ items: ["a", "b", "c", "d"], seed: 7 });
    const second = shuffleRandomItems({ items: ["a", "b", "c", "d"], seed: 7 });

    expect(first).toEqual(second);
    expect(first).not.toEqual(["a", "b", "c", "d"]);
  });

  it("should roll dice within the provided number of faces", () => {
    const result = rollDice({ faces: 20, count: 10, seed: 123 });

    expect(result).toHaveLength(10);
    expect(result.every((value) => value >= 1 && value <= 20)).toBe(true);
  });

  it("should flip a deterministic coin with a seed", () => {
    expect(flipCoin({ seed: 2 })).toBe(flipCoin({ seed: 2 }));
  });

  it("should throw when unique count exceeds range size", () => {
    expect(() =>
      generateRandomIntegers({
        min: 1,
        max: 5,
        count: 10,
        unique: true
      })
    ).toThrow();
  });
});
