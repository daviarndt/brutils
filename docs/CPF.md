# CPF

## Overview

The CPF module provides generation, validation, formatting, stripping, and masking for Brazilian CPF values used in development and testing workflows.

## Available Commands

### Generate CPF

```bash
npm run cpf:generate
```

### Generate formatted CPF

```bash
npm run cpf:generate -- --formatted
```

### Generate multiple unique formatted CPFs

```bash
npm run cpf:generate -- --formatted --count 5 --unique
```

### Generate CPF with a state-biased region digit

```bash
npm run cpf:generate -- --state SP
```

### Validate CPF

```bash
npm run cpf:validate -- 52998224725
```

### Validate CPF with stricter repeated-pattern checks

```bash
npm run cpf:validate -- 52998224725 --strict
```

### Format CPF

```bash
npm run cpf:format -- 52998224725
```

### Strip CPF punctuation

```bash
npm run cpf:strip -- 529.982.247-25
```

### Mask CPF with the default pattern

```bash
npm run cpf:mask -- 52998224725
```

### Mask CPF with a custom pattern

```bash
npm run cpf:mask -- 52998224725 --mask "***.###.***-##"
```

## Actions

| Action     | Script                                         | Description                                  |
| ---------- | ---------------------------------------------- | -------------------------------------------- |
| `generate` | `npm run cpf:generate -- [flags]`              | Generates synthetic valid CPFs.              |
| `validate` | `npm run cpf:validate -- <cpf> [--strict]`     | Validates structure and check digits.        |
| `format`   | `npm run cpf:format -- <cpf>`                  | Formats a CPF as `000.000.000-00`.           |
| `strip`    | `npm run cpf:strip -- <cpf>`                   | Removes punctuation and returns digits only. |
| `mask`     | `npm run cpf:mask -- <cpf> [--mask <pattern>]` | Masks a CPF for safe display.                |

## Flags

| Flag               | Applies to     | Type    | Required | Description                                                                                                            | Example                                                   |
| ------------------ | -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `--formatted`      | `cpf:generate` | boolean | No       | Returns generated CPFs with punctuation.                                                                               | `npm run cpf:generate -- --formatted`                     |
| `--state <uf>`     | `cpf:generate` | string  | No       | Biases the region digit using the provided UF for synthetic test data.                                                 | `npm run cpf:generate -- --state SP`                      |
| `--count <n>`      | `cpf:generate` | integer | No       | Generates multiple CPF values in one run.                                                                              | `npm run cpf:generate -- --count 10`                      |
| `--unique`         | `cpf:generate` | boolean | No       | Avoids duplicates in batch generation.                                                                                 | `npm run cpf:generate -- --count 10 --unique`             |
| `--strict`         | `cpf:validate` | boolean | No       | Rejects obvious repeated patterns such as `11111111111`.                                                               | `npm run cpf:validate -- 11111111111 --strict`            |
| `--mask <pattern>` | `cpf:mask`     | string  | No       | Defines a custom mask pattern. Use `*` to hide digits and `#` to reveal them. Numeric placeholders also reveal digits. | `npm run cpf:mask -- 52998224725 --mask "***.###.***-##"` |

## Notes

- Validation accepts formatted or unformatted CPF values.
- Generated values are synthetic and algorithmically valid.
- The `--state` option is intended for synthetic fixtures and regional bias only.
