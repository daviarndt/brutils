# Random Utilities

## Overview

The random utilities cover random integer generation, float generation, list picking, item shuffling, dice rolling, coin flipping, and numeric range picking.

For backward compatibility, `random-number:generate` remains available as an alias for integer generation and `number-picker:run` remains available for single integer range picking.

## Available Commands

### Integer generation

```bash
npm run random-number:int -- --min 1 --max 100 --count 5
npm run random-number:generate -- --min 1 --max 100 --count 5
```

### Float generation

```bash
npm run random-number:float -- --min 1 --max 10 --count 3 --precision 2
```

### Pick items from a list

```bash
npm run random-number:pick -- --items "apple,banana,orange" --count 2
npm run random-number:pick -- --file ./items.txt --count 3 --unique
```

### Pick one number in a range

```bash
npm run number-picker:run -- --min 1 --max 100
npm run random-number:pick-number -- --min 1 --max 100
```

### Shuffle items

```bash
npm run random-number:shuffle -- --items "apple,banana,orange"
```

### Roll dice

```bash
npm run random-number:dice -- --faces 20 --count 3
```

### Flip a coin

```bash
npm run random-number:coin
```

## Actions

| Action        | Script                                     | Description                                  |
| ------------- | ------------------------------------------ | -------------------------------------------- |
| `int`         | `npm run random-number:int -- [flags]`     | Generates one or many random integers.       |
| `float`       | `npm run random-number:float -- [flags]`   | Generates one or many random floats.         |
| `pick`        | `npm run random-number:pick -- [flags]`    | Picks one or more random items from a list.  |
| `pick-number` | `npm run number-picker:run -- [flags]`     | Picks a single integer from a numeric range. |
| `shuffle`     | `npm run random-number:shuffle -- [flags]` | Shuffles a list of items.                    |
| `dice`        | `npm run random-number:dice -- [flags]`    | Simulates dice rolls.                        |
| `coin`        | `npm run random-number:coin -- [flags]`    | Returns heads or tails.                      |

## Flags

| Flag              | Applies to                     | Type    | Description                                  | Example                                                              |
| ----------------- | ------------------------------ | ------- | -------------------------------------------- | -------------------------------------------------------------------- |
| `--min <n>`       | `int`, `float`, `pick-number`  | number  | Minimum value.                               | `npm run random-number:int -- --min 1 --max 10`                      |
| `--max <n>`       | `int`, `float`, `pick-number`  | number  | Maximum value.                               | `npm run number-picker:run -- --min 1 --max 10`                      |
| `--count <n>`     | `int`, `float`, `pick`, `dice` | integer | Number of results to generate.               | `npm run random-number:dice -- --count 3`                            |
| `--sorted`        | `int`, `float`                 | boolean | Sorts output in ascending order.             | `npm run random-number:float -- --min 1 --max 10 --count 5 --sorted` |
| `--unique`        | `int`, `pick`                  | boolean | Avoids duplicates when possible.             | `npm run random-number:pick -- --items "a,b,c" --count 2 --unique`   |
| `--precision <n>` | `float`                        | integer | Decimal precision for floating-point output. | `npm run random-number:float -- --precision 3`                       |
| `--items <csv>`   | `pick`, `shuffle`              | string  | Comma-separated source items.                | `npm run random-number:shuffle -- --items "red,green,blue"`          |
| `--file <path>`   | `pick`, `shuffle`              | string  | Reads items from a file, one per line.       | `npm run random-number:pick -- --file ./items.txt`                   |
| `--faces <n>`     | `dice`                         | integer | Number of sides on the die.                  | `npm run random-number:dice -- --faces 12`                           |
| `--seed <n>`      | all random actions             | integer | Makes output reproducible.                   | `npm run random-number:int -- --seed 42`                             |

## Notes

- `--items` and `--file` are mutually exclusive.
- `--seed` provides deterministic output for testing and fixtures.
- `random-number:generate` remains an alias for integer generation.
- `number-picker:run` remains available for single range-based number picking.
