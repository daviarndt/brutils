# Brutils

**brutils** is a modular command-line toolkit designed to provide useful utilities for developers.
It includes generators, validators, number utilities and file utilities for development, testing and automation workflows.

The project is designed with a **modular service architecture**, allowing each tool to be used independently and later integrated into a full CLI interface.

---

# Features

Currently implemented utilities:

## Generators

- CPF generator
- CNPJ generator
- CEP generator
- Credit card generator
- Random number generator
- Number picker
- ZIP creation
- ZIP extraction planning and execution

## Validators

- CPF validator
- CNPJ validator
- CEP validator
- Credit card validator

## Credit Card Utilities

- Card number generation
- Expiry date generation
- CVV generation
- Card brand detection
- Validation using the **Luhn algorithm**

## File Utilities

- Create `.zip` files from files and directories
- Extract `.zip` files to output directories
- Dry-run support for ZIP and UNZIP workflows
- Output path resolution helpers

---

# Project Structure

```text
src/
  core/
    utils/
    types/

  services/
    cpf/
    cnpj/
    cep/
    credit-card/
    random-number/
    number-picker/
    zip/
    unzip/

scripts/
  cpf/
  cnpj/
  cep/
  credit-card/
  random-number/
  number-picker/
  zip/
  unzip/

tests/
docs/
```

The project separates **core utilities**, **services**, **execution scripts**, and **tool documentation**, making it easier to scale and maintain.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/DanielArndt0/brutils.git
```

Install dependencies:

```bash
npm install
```

---

# Running the Tools

Currently the utilities are accessed using **npm scripts** that execute the service layer directly.

> Important: when passing flags to `npm run`, always use `--` before your custom flags.

Example:

```bash
npm run number-picker:run -- --min 1 --max 100
npm run zip:run -- ./dist
```

---

# Quick Command Reference

## CPF

Generate:

```bash
npm run cpf:generate
```

Generate formatted:

```bash
npm run cpf:generate -- --formatted
```

Validate:

```bash
npm run cpf:validate -- 52998224725
```

Detailed documentation:

- [CPF overview](docs/CPF.md)

---

## CNPJ

Generate:

```bash
npm run cnpj:generate
```

Generate formatted:

```bash
npm run cnpj:generate -- --formatted
```

Validate:

```bash
npm run cnpj:validate -- 11444777000161
```

Detailed documentation:

- [CNPJ overview](docs/CNPJ.md)

---

## CEP

Generate:

```bash
npm run cep:generate
```

Generate formatted:

```bash
npm run cep:generate -- --formatted
```

Validate:

```bash
npm run cep:validate -- 86010190
```

Detailed documentation:

- [CEP overview](docs/CEP.md)

---

## Credit Card

Generate:

```bash
npm run credit-card:generate -- --brand visa
```

Generate formatted:

```bash
npm run credit-card:generate -- --brand amex --formatted
```

Detect brand:

```bash
npm run credit-card:detect -- 4111111111111111
```

Validate:

```bash
npm run credit-card:validate -- --number 4111111111111111 --expiry 12/30 --cvv 123
```

Detailed documentation:

- [Credit card overview](docs/CREDIT_CARD.md)

---

## Random Number

Generate one random number:

```bash
npm run random-number:generate
```

Generate numbers in a range:

```bash
npm run random-number:generate -- --min 1 --max 100 --count 10
```

Generate sorted values:

```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --sorted
```

Generate unique values:

```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --unique
```

Format output as JSON:

```bash
npm run random-number:generate -- --min 1 --max 100 --count 10 --format json
```

Detailed documentation:

- [Random number overview](docs/RANDOM_NUMBER.md)

---

## Number Picker

Pick one number with defaults:

```bash
npm run number-picker:run
```

Pick one number in a range:

```bash
npm run number-picker:run -- --min 1 --max 100
```

Detailed documentation:

- [Number picker overview](docs/NUMBER_PICKER.md)

---

## ZIP

Create a zip from a source:

```bash
npm run zip:run -- ./dist
```

Create a zip with explicit output:

```bash
npm run zip:run -- ./dist ./artifacts/build.zip
```

Create a zip with flags:

```bash
npm run zip:run -- ./dist --contents-only -x "node_modules/**" -x ".git/**" -f
```

Detailed documentation:

- [ZIP overview](docs/ZIP.md)

---

## UNZIP

Extract a zip file:

```bash
npm run unzip:run -- ./build.zip
```

Extract to an explicit output directory:

```bash
npm run unzip:run -- ./build.zip ./output
```

Detailed documentation:

- [UNZIP overview](docs/UNZIP.md)

---

# Documentation Index

Detailed command and flag documentation is available in the `docs/` folder:

- [CPF](docs/CPF.md)
- [CNPJ](docs/CNPJ.md)
- [CEP](docs/CEP.md)
- [Credit Card](docs/CREDIT_CARD.md)
- [Random Number](docs/RANDOM_NUMBER.md)
- [Number Picker](docs/NUMBER_PICKER.md)
- [ZIP](docs/ZIP.md)
- [UNZIP](docs/UNZIP.md)

---

# Development

Run tests:

```bash
npm run test
```

Watch tests:

```bash
npm run test:watch
```

Run TypeScript checks:

```bash
npm run typecheck
```

Run linter:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

---

# Future CLI

The current project structure is designed to support a full CLI interface in future versions. The service layer implemented today will be used as the foundation for the final command-line experience.
