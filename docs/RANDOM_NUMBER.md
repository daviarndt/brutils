# Random Number

## Overview

The random number module generates one or many random integers.

If no flags are provided, the command generates one random integer using the service defaults.

## Available Command

### Generate random numbers

```bash
npm run random-number:generate
```

## Flags

| Flag       | Type    | Required | Description                          | Example                                                                   |
| ---------- | ------- | -------- | ------------------------------------ | ------------------------------------------------------------------------- |
| `--min`    | integer | No       | Optional minimum value.              | `npm run random-number:generate -- --min 1`                               |
| `--max`    | integer | No       | Optional maximum value.              | `npm run random-number:generate -- --max 100`                             |
| `--count`  | integer | No       | Number of values to generate.        | `npm run random-number:generate -- --min 1 --max 100 --count 10`          |
| `--sorted` | boolean | No       | Sorts the output in ascending order. | `npm run random-number:generate -- --min 1 --max 100 --count 10 --sorted` |
| `--unique` | boolean | No       | Forces unique values.                | `npm run random-number:generate -- --min 1 --max 100 --count 10 --unique` |
| `--format` | string  | No       | Controls output formatting.          | `plain`, `json`, `csv`                                                    |

## Combined examples

```bash
npm run random-number:generate -- --min 1 --max 100 --count 50
npm run random-number:generate -- --min 1 --max 100 --count 50 --unique
npm run random-number:generate -- --min 1 --max 100 --count 50 --sorted
npm run random-number:generate -- --min 1 --max 100 --count 10 --format json
```

## Notes

- `--count` must be a positive integer.
- When `--unique` is enabled, the requested count cannot exceed the range size.
- The current implementation works with integers only.
