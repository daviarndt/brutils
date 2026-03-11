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

### `--min`
Optional minimum value.

Example:
```bash
npm run random-number:generate -- --min 1
```

### `--max`
Optional maximum value.

Example:
```bash
npm run random-number:generate -- --max 100
```

### `--count`
Number of values to generate.

Example:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 10
```

### `--sorted`
Sorts the output in ascending order.

Example:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --sorted
```

### `--unique`
Forces unique values.

Example:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --unique
```

### `--format`
Controls output formatting.

Accepted values:
- `plain`
- `json`
- `csv`

Examples:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --format plain
npm run random-number:generate -- --min 1 --max 100 --count 10 --format json
npm run random-number:generate -- --min 1 --max 100 --count 10 --format csv
```

## Combined examples

Generate 50 numbers between 1 and 100:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 50
```

Generate 50 unique numbers between 1 and 100:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 50 --unique
```

Generate 50 sorted numbers between 1 and 100:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 50 --sorted
```

Generate JSON output:
```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --format json
```

## Notes

- `--count` must be a positive integer.
- When `--unique` is enabled, the requested count cannot exceed the range size.
- The current implementation works with integers only.
