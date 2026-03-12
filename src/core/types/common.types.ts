export type NumericString = string;

export interface GeneratorOptions {
  formatted?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  value: string;
  formatted?: string | undefined;
}
