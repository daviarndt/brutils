# Number Picker

## Overview

The number picker module selects one random integer from a numeric range.

This module remains available for backwards compatibility and now supports `--seed` for reproducible picks.

## Available Commands

### Pick one number

```bash
npm run number-picker:run -- --min 1 --max 100
```

## Flags

| Flag         | Type    | Required | Description                    | Example                                                    |
| ------------ | ------- | -------- | ------------------------------ | ---------------------------------------------------------- |
| `--min <n>`  | integer | No       | Optional minimum value.        | `npm run number-picker:run -- --min 1`                     |
| `--max <n>`  | integer | No       | Optional maximum value.        | `npm run number-picker:run -- --max 100`                   |
| `--seed <n>` | integer | No       | Makes the result reproducible. | `npm run number-picker:run -- --min 1 --max 100 --seed 42` |

## Notes

- The command returns a single integer.
- For the broader random utilities group, also see `RANDOM_NUMBER.md`.
