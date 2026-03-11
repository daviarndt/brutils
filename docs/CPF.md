# CPF

## Overview

The CPF module provides generation and validation for Brazilian CPF numbers.

## Available Commands

### Generate CPF

```bash
npm run cpf:generate
```

### Generate formatted CPF

```bash
npm run cpf:generate -- --formatted
```

### Validate CPF

```bash
npm run cpf:validate -- 52998224725
```

## Flags

### `--formatted`
Used with `cpf:generate`.

When enabled, the generated CPF is returned with punctuation.

Example:
```bash
npm run cpf:generate -- --formatted
```

Output example:
```text
529.982.247-25
```

## Notes

- Validation accepts formatted or unformatted CPF values.
- Generated values are algorithmically valid.
