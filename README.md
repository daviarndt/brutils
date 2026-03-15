# Brutils

**Brutils** is a modular command-line toolkit with practical utilities for Brazilian and general developer workflows.

It includes:

- CPF, CNPJ and CEP generation, validation, formatting, stripping and masking
- credit card test data generation, validation and brand detection
- random integers, floats, picks, shuffles, dice rolls and coin flips
- number picking with deterministic seeds
- ZIP creation, archive listing, archive testing and ZIP extraction
- core text helpers for strings and local JSON manipulation

The project keeps a modular service architecture internally, but now ships with a real CLI entrypoint:

```bash
brutils --help
```

---

## Installation

### Local project setup

```bash
npm install
npm run build
npm link
```

After linking, the `brutils` command will be available on your machine for local development.

### Package usage

If you publish this package to GitHub Packages, install it with your configured registry and then use:

```bash
brutils --help
```

---

## Quick Start

```bash
brutils cpf generate --formatted
brutils cnpj validate 11.444.777/0001-61 --strict
brutils cep mask 86010190 --mask "###**-***"

brutils credit-card generate --brand visa --formatted
brutils credit-card detect 4111111111111111

brutils str slug --text "Olá Mundo Legal"
brutils json format --value '{"name":"brutils","ok":true}' --sort-keys

brutils random-number int --min 1 --max 60 --count 6 --unique --sorted
brutils random-number pick --items "red,blue,green" --count 2

brutils number-picker run --min 1 --max 100 --seed 42

brutils zip create ./dist --out ./artifacts/dist.zip
brutils unzip extract ./artifacts/dist.zip --out ./restored
```

---

## CLI Structure

```text
brutils
├── cpf
│   ├── generate
│   ├── validate
│   ├── format
│   ├── strip
│   └── mask
├── cnpj
│   ├── generate
│   ├── validate
│   ├── format
│   ├── strip
│   └── mask
├── cep
│   ├── generate
│   ├── validate
│   ├── format
│   ├── strip
│   └── mask
├── credit-card
│   ├── generate
│   ├── validate
│   └── detect
├── str
│   ├── slug
│   ├── case
│   ├── trim
│   ├── truncate
│   ├── replace
│   ├── normalize
│   ├── remove-accents
│   ├── pad
│   ├── extract
│   ├── base64
│   ├── urlencode
│   └── html
├── json
│   ├── format
│   ├── minify
│   ├── validate
│   ├── get
│   ├── set
│   ├── delete
│   ├── diff
│   ├── merge
│   └── to-yaml
├── random-number
│   ├── int
│   ├── float
│   ├── pick
│   ├── shuffle
│   ├── dice
│   └── coin
├── number-picker
│   └── run
├── zip
│   ├── create
│   ├── list
│   └── test
└── unzip
    ├── extract
    ├── list
    └── test
```

Aliases currently supported:

- `brutils card ...` for `brutils credit-card ...`
- `brutils rand ...` for `brutils random-number ...`
- `brutils zip run ...` for `brutils zip create ...`
- `brutils unzip run ...` for `brutils unzip extract ...`

---

## Built-in Help

The CLI includes module-level and action-level help.

Examples:

```bash
brutils --help
brutils cpf --help
brutils cpf generate --help
brutils random-number --help
brutils zip create --help
```

---

## Development Commands

The legacy `npm run ...` scripts are still kept for local development and backwards compatibility.

Main development commands:

```bash
npm run cli -- --help
npm run build
npm run lint
npm run typecheck
npm run test:unit
```

Examples using the legacy scripts:

```bash
npm run cpf:generate -- --formatted
npm run random-number:int -- --min 1 --max 10 --count 3
npm run zip:create -- ./dist --out ./artifacts/dist.zip
```

---

## Documentation

- [CPF](docs/CPF.md)
- [CNPJ](docs/CNPJ.md)
- [CEP](docs/CEP.md)
- [Credit Card](docs/CREDIT_CARD.md)
- [STR](docs/STR.md)
- [JSON](docs/JSON.md)
- [Random Utilities](docs/RANDOM_NUMBER.md)
- [Number Picker](docs/NUMBER_PICKER.md)
- [ZIP](docs/ZIP.md)
- [UNZIP](docs/UNZIP.md)

---

## Project Structure

```text
src/
  cli.ts
  core/
  services/

scripts/
  cpf/
  cnpj/
  cep/
  credit-card/
  random-number/
  number-picker/
  str/
  json/
  zip/
  unzip/

tests/
docs/
.github/workflows/
```

---

## CI/CD

This repository is prepared for three workflow layers:

- **CI** for push and pull request validation
- **Preview publish** on `main`, producing a `-dev.<run_number>` package version
- **Release publish** on stable tags like `v0.3.0`

The workflows live in `.github/workflows/`.

---

## Notes

- CPF, CNPJ, CEP and credit card generators produce synthetic values for testing and development.
- ZIP and UNZIP helpers support dry-run planning, listing and testing.
- Seeded random commands are useful for reproducible fixtures and test scenarios.
