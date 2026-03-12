export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function allDigitsEqual(value: string): boolean {
  return /^(\d)\1+$/.test(value);
}
