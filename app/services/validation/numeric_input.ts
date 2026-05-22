export type NumericFieldSpec = {
  Label: string;
  Minimum: number;
  Maximum: number;
};

export type NumericValidationResult =
  | {
      IsValid: true;
      ParsedValue: number;
    }
  | {
      IsValid: false;
      ErrorMessage: string;
    };

export function FormatNumber(Value: number | bigint): string {
  return Value.toLocaleString("en-US");
}

export function ValidateWholeNumberInput(
  RawValue: string,
  FieldSpec: NumericFieldSpec,
): NumericValidationResult {
  const TrimmedValue = RawValue.trim();

  if (TrimmedValue.length === 0) {
    return {
      IsValid: false,
      ErrorMessage: `Enter ${FieldSpec.Label.toLowerCase()}.`,
    };
  }

  if (!/^-?\d+$/.test(TrimmedValue)) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} must be a whole number.`,
    };
  }

  const ParsedValue = Number(TrimmedValue);

  if (!Number.isSafeInteger(ParsedValue)) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} is outside the safe integer range.`,
    };
  }

  if (ParsedValue < FieldSpec.Minimum) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} must be at least ${FormatNumber(FieldSpec.Minimum)}.`,
    };
  }

  if (ParsedValue > FieldSpec.Maximum) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} must be at most ${FormatNumber(FieldSpec.Maximum)}.`,
    };
  }

  return { IsValid: true, ParsedValue };
}
