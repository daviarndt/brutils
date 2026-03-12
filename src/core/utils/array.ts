import { BRUtilsError } from "../errors/brutils.error.js";

export type RandomSource = () => number;

export function pickRandomItem<T>(
  items: T[],
  randomSource: RandomSource = Math.random
): T {
  const item = items[Math.floor(randomSource() * items.length)];

  if (item === undefined) {
    throw new BRUtilsError("Cannot pick a random item from an empty array.");
  }

  return item;
}

export function getItemAtIndex<T>(items: T[], index: number): T {
  const item = items[index];

  if (item === undefined) {
    throw new BRUtilsError(`Array index out of bounds: ${index}`);
  }

  return item;
}

export function shuffleArray<T>(
  items: T[],
  randomSource: RandomSource = Math.random
): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomSource() * (index + 1));

    const currentValue = getItemAtIndex(result, index);
    const swapValue = getItemAtIndex(result, swapIndex);

    result[index] = swapValue;
    result[swapIndex] = currentValue;
  }

  return result;
}
