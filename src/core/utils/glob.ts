import * as minimatchModule from "minimatch";

type MinimatchLike = (
  input: string,
  pattern: string,
  options?: { dot?: boolean }
) => boolean;

function resolveMinimatch(): MinimatchLike {
  const moduleValue = minimatchModule as unknown as {
    minimatch?: MinimatchLike;
    default?: MinimatchLike;
  } & MinimatchLike;

  if (typeof moduleValue.minimatch === "function") {
    return moduleValue.minimatch;
  }

  if (typeof moduleValue.default === "function") {
    return moduleValue.default;
  }

  if (typeof moduleValue === "function") {
    return moduleValue;
  }

  throw new Error("Could not resolve minimatch implementation.");
}

const minimatch = resolveMinimatch();

export function matchesGlob(input: string, pattern: string): boolean {
  return minimatch(input, pattern, { dot: true });
}
