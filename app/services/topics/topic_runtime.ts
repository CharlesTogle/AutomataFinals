import type { TopicContent } from "~/content/topics/topic_types";
import { BuildCollatzRun } from "~/services/topics/collatz";
import { BuildDivisionRun } from "~/services/topics/division";
import { BuildEuclideanRun } from "~/services/topics/euclidean";
import { BuildFibonacciRun } from "~/services/topics/fibonacci";
import { BuildLucasNumbersRun } from "~/services/topics/lucas_numbers";
import { BuildPalindromeRun } from "~/services/topics/palindrome";
import { BuildTribonacciRun } from "~/services/topics/tribonacci";
import {
  ValidateWholeNumberInput,
  type NumericValidationResult,
} from "~/services/validation/numeric_input";
import {
  ValidateTextInput,
  type TextValidationResult,
} from "~/services/validation/text_input";
import type { TopicRunModel } from "~/services/visualization/types";

export type TopicPresentation = TopicRunModel;

export type TopicFieldValues = Record<string, string>;

export type TopicRuntimeSuccess = {
  IsValid: true;
  Presentation: TopicPresentation;
};

export type TopicRuntimeFailure = {
  IsValid: false;
  ErrorMessage: string;
};

export type TopicRuntimeResult = TopicRuntimeSuccess | TopicRuntimeFailure;

function ReadValidatedNumber(
  Content: TopicContent,
  FieldValues: TopicFieldValues,
  FieldKey: string,
): NumericValidationResult {
  const InputField = Content.Inputs.find((Input) => Input.Key === FieldKey);

  if (!InputField) {
    return {
      IsValid: false,
      ErrorMessage: `Missing input configuration for ${FieldKey}.`,
    };
  }

  if (typeof InputField.Minimum !== "number" || typeof InputField.Maximum !== "number") {
    return {
      IsValid: false,
      ErrorMessage: `Missing numeric range for ${FieldKey}.`,
    };
  }

  return ValidateWholeNumberInput(FieldValues[FieldKey] ?? "", {
    Label: InputField.Label,
    Minimum: InputField.Minimum,
    Maximum: InputField.Maximum,
  });
}

function ReadValidatedText(
  Content: TopicContent,
  FieldValues: TopicFieldValues,
  FieldKey: string,
): TextValidationResult {
  const InputField = Content.Inputs.find((Input) => Input.Key === FieldKey);

  if (!InputField) {
    return {
      IsValid: false,
      ErrorMessage: `Missing input configuration for ${FieldKey}.`,
    };
  }

  if (typeof InputField.MaximumLength !== "number") {
    return {
      IsValid: false,
      ErrorMessage: `Missing text length limit for ${FieldKey}.`,
    };
  }

  return ValidateTextInput(FieldValues[FieldKey] ?? "", {
    Label: InputField.Label,
    MinimumLength: InputField.MinimumLength ?? 1,
    MaximumLength: InputField.MaximumLength,
    Pattern: /^[a-z0-9\s]+$/i,
    AllowedDescription: "letters, digits, and spaces only",
  });
}

function GetValidatedValue(
  Content: TopicContent,
  FieldValues: TopicFieldValues,
  FieldKey: string,
): TopicRuntimeResult | number {
  const Validation = ReadValidatedNumber(Content, FieldValues, FieldKey);

  if (!Validation.IsValid) {
    return Validation;
  }

  return Validation.ParsedValue;
}

export function GetInitialFieldValues(Content: TopicContent): TopicFieldValues {
  return Object.fromEntries(
    Content.Inputs.map((Input) => [Input.Key, Input.DefaultValue]),
  );
}

export function BuildTopicPresentation(
  Content: TopicContent,
  FieldValues: TopicFieldValues,
): TopicRuntimeResult {
  switch (Content.Slug) {
    case "fibonacci": {
      const TermCount = GetValidatedValue(Content, FieldValues, "TermCount");
      if (typeof TermCount !== "number") {
        return TermCount;
      }

      return {
        IsValid: true,
        Presentation: BuildFibonacciRun(TermCount),
      };
    }

    case "lucas-numbers": {
      const TermCount = GetValidatedValue(Content, FieldValues, "TermCount");
      if (typeof TermCount !== "number") {
        return TermCount;
      }

      return {
        IsValid: true,
        Presentation: BuildLucasNumbersRun(TermCount),
      };
    }

    case "tribonacci": {
      const TermCount = GetValidatedValue(Content, FieldValues, "TermCount");
      if (typeof TermCount !== "number") {
        return TermCount;
      }

      return {
        IsValid: true,
        Presentation: BuildTribonacciRun(TermCount),
      };
    }

    case "collatz": {
      const StartValue = GetValidatedValue(Content, FieldValues, "StartValue");
      if (typeof StartValue !== "number") {
        return StartValue;
      }

      return {
        IsValid: true,
        Presentation: BuildCollatzRun(StartValue),
      };
    }

    case "palindrome": {
      const Candidate = ReadValidatedText(Content, FieldValues, "Candidate");
      if (!Candidate.IsValid) {
        return Candidate;
      }

      return {
        IsValid: true,
        Presentation: BuildPalindromeRun(Candidate.ParsedValue),
      };
    }

    case "division": {
      const FirstValue = GetValidatedValue(Content, FieldValues, "FirstValue");
      if (typeof FirstValue !== "number") {
        return FirstValue;
      }

      const SecondValue = GetValidatedValue(Content, FieldValues, "SecondValue");
      if (typeof SecondValue !== "number") {
        return SecondValue;
      }

      return {
        IsValid: true,
        Presentation: BuildDivisionRun(FirstValue, SecondValue),
      };
    }

    case "euclidean": {
      const FirstValue = GetValidatedValue(Content, FieldValues, "FirstValue");
      if (typeof FirstValue !== "number") {
        return FirstValue;
      }

      const SecondValue = GetValidatedValue(Content, FieldValues, "SecondValue");
      if (typeof SecondValue !== "number") {
        return SecondValue;
      }

      return {
        IsValid: true,
        Presentation: BuildEuclideanRun(FirstValue, SecondValue),
      };
    }

    default:
      return {
        IsValid: false,
        ErrorMessage: `No runtime is registered for ${Content.Slug}.`,
      };
  }
}
