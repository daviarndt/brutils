import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { createRandomSource } from "../../core/utils/seeded-random.js";
import type { NumberPickerOptions } from "./number-picker.types.js";

function resolveMin(min?: number): number {
  return min ?? Number.MIN_SAFE_INTEGER;
}

function resolveMax(max?: number): number {
  return max ?? Number.MAX_SAFE_INTEGER;
}

export function pickRandomNumber(options: NumberPickerOptions = {}): number {
  const min = resolveMin(options.min);
  const max = resolveMax(options.max);
  const randomSource = createRandomSource(options.seed);

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new BRUtilsError("Minimum and maximum values must be integers.");
  }

  if (min > max) {
    throw new BRUtilsError(
      "Minimum value cannot be greater than maximum value."
    );
  }

  return Math.floor(randomSource() * (max - min + 1)) + min;
}
