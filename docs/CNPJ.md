# CNPJ

## Overview

The CNPJ module provides generation and validation for Brazilian CNPJ numbers.

## Available Commands

### Generate CNPJ

```bash
npm run cnpj:generate
```

### Generate formatted CNPJ

```bash
npm run cnpj:generate -- --formatted
```

### Validate CNPJ

```bash
npm run cnpj:validate -- 11444777000161
```

## Flags

### `--formatted`
Used with `cnpj:generate`.

When enabled, the generated CNPJ is returned with punctuation.

Example:
```bash
npm run cnpj:generate -- --formatted
```

Output example:
```text
11.444.777/0001-61
```

## Notes

- Validation accepts formatted or unformatted CNPJ values.
- Generated values are algorithmically valid.
