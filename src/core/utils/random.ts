export function randomDigit(): number {
  return Math.floor(Math.random() * 10);
}

export function randomDigits(length: number): number[] {
  return Array.from({ length }, () => randomDigit());
}
