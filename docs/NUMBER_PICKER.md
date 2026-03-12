# Number Picker

## Overview

The number picker module selects one random integer.

If no flags are provided, the command uses the service defaults.

## Available Command

### Pick one number

```bash
npm run number-picker:run
```

### Pick one number in a range

```bash
npm run number-picker:run -- --min 1 --max 100
```

## Flags

| Flag    | Type    | Required | Description             | Example                                  |
| ------- | ------- | -------- | ----------------------- | ---------------------------------------- |
| `--min` | integer | No       | Optional minimum value. | `npm run number-picker:run -- --min 1`   |
| `--max` | integer | No       | Optional maximum value. | `npm run number-picker:run -- --max 100` |

## Notes

- The command returns a single integer.
- The current implementation works with integers only.
