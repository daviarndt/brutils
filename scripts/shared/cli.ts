export function getArgValue(
  argv: string[],
  ...flags: string[]
): string | undefined {
  for (const flag of flags) {
    const index = argv.indexOf(flag);
    if (index !== -1) return argv[index + 1];
  }
  return undefined;
}
export function hasFlag(argv: string[], ...flags: string[]): boolean {
  return flags.some((flag) => argv.includes(flag));
}
export function parseOptionalInteger(value?: string): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed))
    throw new Error(`Invalid integer value: ${value}`);
  return parsed;
}
export function getPositionalArgs(
  argv: string[],
  valueFlags: string[]
): string[] {
  const valueFlagSet = new Set(valueFlags);
  const positional: string[] = [];
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current) continue;
    if (valueFlagSet.has(current)) {
      index += 1;
      continue;
    }
    if (current.startsWith("-")) continue;
    positional.push(current);
  }
  return positional;
}
export function printGenerateOutput(values: string[]): void {
  console.log(values.join(""));
}
