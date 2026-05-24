export type TextFieldSpec = {
  Label: string;
  MinimumLength: number;
  MaximumLength: number;
  Pattern: RegExp;
  AllowedDescription: string;
};

export type TextValidationResult =
  | {
      IsValid: true;
      ParsedValue: string;
    }
  | {
      IsValid: false;
      ErrorMessage: string;
    };

export function ValidateTextInput(
  RawValue: string,
  FieldSpec: TextFieldSpec,
): TextValidationResult {
  const TrimmedValue = RawValue.trim();

  if (TrimmedValue.length === 0 && FieldSpec.MinimumLength > 0) {
    return {
      IsValid: false,
      ErrorMessage: `Enter ${FieldSpec.Label.toLowerCase()}.`,
    };
  }

  if (TrimmedValue.length < FieldSpec.MinimumLength) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} must be at least ${FieldSpec.MinimumLength} characters.`,
    };
  }

  if (TrimmedValue.length === 0) {
    return {
      IsValid: true,
      ParsedValue: "",
    };
  }

  if (TrimmedValue.length > FieldSpec.MaximumLength) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} must be at most ${FieldSpec.MaximumLength} characters.`,
    };
  }

  if (!FieldSpec.Pattern.test(TrimmedValue)) {
    return {
      IsValid: false,
      ErrorMessage: `${FieldSpec.Label} must use ${FieldSpec.AllowedDescription}.`,
    };
  }

  return {
    IsValid: true,
    ParsedValue: TrimmedValue,
  };
}
