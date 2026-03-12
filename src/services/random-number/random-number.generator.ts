import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type { RandomNumberGenerateOptions } from "./random-number.types.js";
import { shuffleArray } from "../../core/utils/array.js";

function resolveMin(min?: number): number {
  return min ?? Number.MIN_SAFE_INTEGER;
}

function resolveMax(max?: number): number {
  return max ?? Number.MAX_SAFE_INTEGER;
}

function randomIntegerBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumbers(
  options: RandomNumberGenerateOptions = {}
): number[] {
  const min = resolveMin(options.min);
  const max = resolveMax(options.max);
  const count = options.count ?? 1;
  const unique = options.unique ?? false;
  const sorted = options.sorted ?? false;

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new BRUtilsError("Minimum and maximum values must be integers.");
  }

  if (min > max) {
    throw new BRUtilsError(
      "Minimum value cannot be greater than maximum value."
    );
  }

  if (!Number.isInteger(count) || count < 1) {
    throw new BRUtilsError("Count must be a positive integer.");
  }

  const availableNumbers = max - min + 1;

  if (unique && count > availableNumbers) {
    throw new BRUtilsError(
      "Cannot generate more unique numbers than the available range size."
    );
  }

  let result: number[];

  if (unique) {
    const pool = Array.from(
      { length: availableNumbers },
      (_, index) => min + index
    );
    result = shuffleArray(pool).slice(0, count);
  } else {
    result = Array.from({ length: count }, () =>
      randomIntegerBetween(min, max)
    );
  }

  if (sorted) {
    result.sort((a, b) => a - b);
  }

  return result;
}
