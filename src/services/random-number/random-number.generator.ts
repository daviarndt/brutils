import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { pickRandomItem, shuffleArray } from "../../core/utils/array.js";
import { createRandomSource } from "../../core/utils/seeded-random.js";
import type {
  CoinFlipOptions,
  DiceRollOptions,
  RandomFloatGenerateOptions,
  RandomIntegerGenerateOptions,
  RandomPickOptions,
  RandomNumberGenerateOptions,
  RandomShuffleOptions
} from "./random-number.types.js";

function resolveIntegerMin(min?: number): number {
  return min ?? Number.MIN_SAFE_INTEGER;
}

function resolveIntegerMax(max?: number): number {
  return max ?? Number.MAX_SAFE_INTEGER;
}

function resolveFloatMin(min?: number): number {
  return min ?? 0;
}

function resolveFloatMax(max?: number): number {
  return max ?? 1;
}

function randomIntegerBetween(
  min: number,
  max: number,
  randomSource: () => number
): number {
  return Math.floor(randomSource() * (max - min + 1)) + min;
}

function randomFloatBetween(
  min: number,
  max: number,
  randomSource: () => number
): number {
  return randomSource() * (max - min) + min;
}

function validateRange(min: number, max: number, integerOnly = true): void {
  if (integerOnly && (!Number.isInteger(min) || !Number.isInteger(max))) {
    throw new BRUtilsError("Minimum and maximum values must be integers.");
  }

  if (min > max) {
    throw new BRUtilsError(
      "Minimum value cannot be greater than maximum value."
    );
  }
}

function validateCount(count: number): void {
  if (!Number.isInteger(count) || count < 1) {
    throw new BRUtilsError("Count must be a positive integer.");
  }
}

function normalizePrecision(precision?: number): number | undefined {
  if (precision === undefined) {
    return undefined;
  }

  if (!Number.isInteger(precision) || precision < 0) {
    throw new BRUtilsError("Precision must be a non-negative integer.");
  }

  return precision;
}

function normalizeItems(items: string[]): string[] {
  const normalized = items.map((item) => item.trim()).filter(Boolean);

  if (normalized.length === 0) {
    throw new BRUtilsError("At least one item must be provided.");
  }

  return normalized;
}

function applyFloatPrecision(value: number, precision?: number): number {
  if (precision === undefined) {
    return value;
  }

  return Number(value.toFixed(precision));
}

export function generateRandomIntegers(
  options: RandomIntegerGenerateOptions = {}
): number[] {
  const min = resolveIntegerMin(options.min);
  const max = resolveIntegerMax(options.max);
  const count = options.count ?? 1;
  const unique = options.unique ?? false;
  const sorted = options.sorted ?? false;
  const randomSource = createRandomSource(options.seed);

  validateRange(min, max, true);
  validateCount(count);

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
    result = shuffleArray(pool, randomSource).slice(0, count);
  } else {
    result = Array.from({ length: count }, () =>
      randomIntegerBetween(min, max, randomSource)
    );
  }

  if (sorted) {
    result.sort((a, b) => a - b);
  }

  return result;
}

export function generateRandomNumbers(
  options: RandomNumberGenerateOptions = {}
): number[] {
  return generateRandomIntegers(options);
}

export function generateRandomFloats(
  options: RandomFloatGenerateOptions = {}
): number[] {
  const min = resolveFloatMin(options.min);
  const max = resolveFloatMax(options.max);
  const count = options.count ?? 1;
  const sorted = options.sorted ?? false;
  const precision = normalizePrecision(options.precision);
  const randomSource = createRandomSource(options.seed);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new BRUtilsError(
      "Minimum and maximum values must be finite numbers."
    );
  }

  validateRange(min, max, false);
  validateCount(count);

  const result = Array.from({ length: count }, () =>
    applyFloatPrecision(randomFloatBetween(min, max, randomSource), precision)
  );

  if (sorted) {
    result.sort((a, b) => a - b);
  }

  return result;
}

export function pickRandomItems(options: RandomPickOptions): string[] {
  const items = normalizeItems(options.items);
  const count = options.count ?? 1;
  const unique = options.unique ?? false;
  const randomSource = createRandomSource(options.seed);

  validateCount(count);

  if (unique && count > items.length) {
    throw new BRUtilsError(
      "Cannot pick more unique items than the available item count."
    );
  }

  if (unique) {
    return shuffleArray(items, randomSource).slice(0, count);
  }

  return Array.from({ length: count }, () =>
    pickRandomItem(items, randomSource)
  );
}

export function shuffleRandomItems(options: RandomShuffleOptions): string[] {
  return shuffleArray(
    normalizeItems(options.items),
    createRandomSource(options.seed)
  );
}

export function rollDice(options: DiceRollOptions = {}): number[] {
  const faces = options.faces ?? 6;
  const count = options.count ?? 1;
  const randomSource = createRandomSource(options.seed);

  if (!Number.isInteger(faces) || faces < 2) {
    throw new BRUtilsError(
      "Dice faces must be an integer greater than or equal to 2."
    );
  }

  validateCount(count);

  return Array.from({ length: count }, () =>
    randomIntegerBetween(1, faces, randomSource)
  );
}

export function flipCoin(options: CoinFlipOptions = {}): "heads" | "tails" {
  const randomSource = createRandomSource(options.seed);

  return randomSource() < 0.5 ? "heads" : "tails";
}
