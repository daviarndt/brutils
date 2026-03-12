# CNPJ

## Overview

The CNPJ module provides generation, validation, formatting, stripping, and masking for Brazilian CNPJ values used in development and testing workflows.

## Available Commands

### Generate CNPJ

```bash
npm run cnpj:generate
```

### Generate formatted CNPJ

```bash
npm run cnpj:generate -- --formatted
```

### Generate multiple unique formatted CNPJs

```bash
npm run cnpj:generate -- --formatted --count 5 --unique
```

### Generate CNPJ with a custom branch

```bash
npm run cnpj:generate -- --branch 12
```

### Validate CNPJ

```bash
npm run cnpj:validate -- 11444777000161
```

### Validate CNPJ with stricter repeated-pattern checks

```bash
npm run cnpj:validate -- 11444777000161 --strict
```

### Format CNPJ

```bash
npm run cnpj:format -- 11444777000161
```

### Strip CNPJ punctuation

```bash
npm run cnpj:strip -- 11.444.777/0001-61
```

### Mask CNPJ with the default pattern

```bash
npm run cnpj:mask -- 11444777000161
```

### Mask CNPJ with a custom pattern

```bash
npm run cnpj:mask -- 11444777000161 --mask "##.***.***/****-##"
```

## Actions

| Action     | Script                                           | Description                                  |
| ---------- | ------------------------------------------------ | -------------------------------------------- |
| `generate` | `npm run cnpj:generate -- [flags]`               | Generates synthetic valid CNPJs.             |
| `validate` | `npm run cnpj:validate -- <cnpj> [--strict]`     | Validates structure and check digits.        |
| `format`   | `npm run cnpj:format -- <cnpj>`                  | Formats a CNPJ as `00.000.000/0000-00`.      |
| `strip`    | `npm run cnpj:strip -- <cnpj>`                   | Removes punctuation and returns digits only. |
| `mask`     | `npm run cnpj:mask -- <cnpj> [--mask <pattern>]` | Masks a CNPJ for safe display.               |

## Flags

| Flag                | Applies to      | Type    | Required | Description                                                                                                            | Example                                                           |
| ------------------- | --------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `--formatted`       | `cnpj:generate` | boolean | No       | Returns generated CNPJs with punctuation.                                                                              | `npm run cnpj:generate -- --formatted`                            |
| `--branch <number>` | `cnpj:generate` | string  | No       | Sets the branch identifier used in generation. Values with fewer than 4 digits are left-padded with zeros.             | `npm run cnpj:generate -- --branch 12`                            |
| `--count <n>`       | `cnpj:generate` | integer | No       | Generates multiple CNPJ values in one run.                                                                             | `npm run cnpj:generate -- --count 10`                             |
| `--unique`          | `cnpj:generate` | boolean | No       | Avoids duplicates in batch generation.                                                                                 | `npm run cnpj:generate -- --count 10 --unique`                    |
| `--strict`          | `cnpj:validate` | boolean | No       | Rejects obvious repeated patterns such as `00000000000000`.                                                            | `npm run cnpj:validate -- 00000000000000 --strict`                |
| `--mask <pattern>`  | `cnpj:mask`     | string  | No       | Defines a custom mask pattern. Use `*` to hide digits and `#` to reveal them. Numeric placeholders also reveal digits. | `npm run cnpj:mask -- 11444777000161 --mask "##.***.***/****-##"` |

## Notes

- Validation accepts formatted or unformatted CNPJ values.
- Generated values are synthetic and algorithmically valid.
- The `--branch` flag is useful for consistent branch-oriented fixtures.
