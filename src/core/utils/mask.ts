import { BRUtilsError } from "../errors/brutils.error.js";

export function applyDigitMask(value: string, pattern: string): string {
  let index = 0;
  let result = "";
  for (const token of pattern) {
    if (token === "*") {
      if (value[index] === undefined)
        throw new BRUtilsError(
          "Mask pattern consumes more digits than the input provides."
        );
      result += "*";
      index += 1;
      continue;
    }
    if (token === "#" || /\d/.test(token)) {
      const digit = value[index];
      if (digit === undefined)
        throw new BRUtilsError(
          "Mask pattern consumes more digits than the input provides."
        );
      result += digit;
      index += 1;
      continue;
    }
    result += token;
  }
  if (index != value.length)
    throw new BRUtilsError(
      `Mask pattern consumed ${index} digits, but the input has ${value.length}.`
    );
  return result;
}
