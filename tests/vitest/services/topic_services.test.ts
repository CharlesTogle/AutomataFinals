import { describe, expect, it } from "vitest";

import { FibonacciContent } from "~/content/topics/fibonacci";
import { PalindromeContent } from "~/content/topics/palindrome";
import { BuildCollatzRun, BuildCollatzSequence } from "~/services/topics/collatz";
import { BuildDivisionRun } from "~/services/topics/division";
import { BuildFibonacciRun, BuildFibonacciSequence } from "~/services/topics/fibonacci";
import { BuildEuclideanRun } from "~/services/topics/euclidean";
import { BuildLucasNumbersSequence } from "~/services/topics/lucas_numbers";
import { BuildPalindromeRun } from "~/services/topics/palindrome";
import { BuildTopicPresentation } from "~/services/topics/topic_runtime";
import { BuildTribonacciSequence } from "~/services/topics/tribonacci";
import { ValidateWholeNumberInput } from "~/services/validation/numeric_input";
import { ValidateTextInput } from "~/services/validation/text_input";

describe("topic services", () => {
  it("builds the expected Fibonacci sequence", () => {
    expect(BuildFibonacciSequence(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("accepts a single Fibonacci term", () => {
    const RuntimeResult = BuildTopicPresentation(FibonacciContent, {
      TermCount: "1",
    });

    expect(RuntimeResult.IsValid).toBe(true);

    if (RuntimeResult.IsValid) {
      expect(RuntimeResult.Presentation.FinalValue.Notation).toBe("F(0)");
      expect(RuntimeResult.Presentation.FinalValue.Number).toBe("0");
    }
  });

  it("builds the expected Lucas sequence", () => {
    expect(BuildLucasNumbersSequence(8)).toEqual([2, 1, 3, 4, 7, 11, 18, 29]);
  });

  it("builds the expected Tribonacci sequence", () => {
    expect(BuildTribonacciSequence(8)).toEqual([0, 0, 1, 1, 2, 4, 7, 13]);
  });

  it("builds the expected Collatz chain", () => {
    expect(BuildCollatzSequence(7)).toEqual([
      7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1,
    ]);
  });

  it("assigns odd and even tones to Collatz steps and legend", () => {
    const RunModel = BuildCollatzRun(7);

    expect(RunModel.Legend).toEqual([
      { Tone: "even", Label: "/2" },
      { Tone: "odd", Label: "3n + 1" },
    ]);
    expect(RunModel.Dependencies[0]?.Tone).toBe("odd");
    expect(RunModel.Dependencies[1]?.Tone).toBe("even");
    expect(RunModel.Steps[1]?.ActiveSourceTone).toBe("odd");
    expect(RunModel.Steps[2]?.ActiveSourceTone).toBe("even");
  });

  it("keeps large Fibonacci requests bounded to a preview while computing the final term", () => {
    const RunModel = BuildFibonacciRun(100_000);

    expect(RunModel.Items).toHaveLength(100);
    expect(RunModel.FinalValue.Notation).toBe("F(99,999)");
    expect(RunModel.FinalValue.DetailText).toBe(
      "Animated preview shows the first 100 terms. Final value computed at F(99,999).",
    );
    expect(RunModel.FinalValue.Number.length).toBeGreaterThan(1_000);
  });

  it("builds the division final equation", () => {
    const RunModel = BuildDivisionRun(42, 5);

    expect(RunModel.FinalValue.Number).toBe("42 = 5(8) + 2");
    expect(RunModel.FinalValue.DetailText).toContain("q = 8");
  });

  it("formats large division values with comma separators", () => {
    const RunModel = BuildDivisionRun(1_000_000, 1_000);

    expect(RunModel.FinalValue.Number).toBe("1,000,000 = 1,000(1,000) + 0");
    expect(RunModel.FinalValue.DetailText).toBe("q = 1,000, r = 0");
  });

  it("builds the Euclidean final gcd and lcm", () => {
    const RunModel = BuildEuclideanRun(252, 105);

    expect(RunModel.FinalValue.Number).toBe("21");
    expect(RunModel.FinalValue.Blocks).toEqual([
      { Label: "GCD", Value: "21" },
      { Label: "LCM", Value: "1,260" },
    ]);
    expect(RunModel.FinalValue.DetailText).toBe("lcm = (252 x 105) / 21 = 1,260");
  });

  it("formats large Euclidean results with comma separators", () => {
    const RunModel = BuildEuclideanRun(1_000_000, 10_000);

    expect(RunModel.FinalValue.Notation).toBe("gcd(1,000,000, 10,000)");
    expect(RunModel.FinalValue.Number).toBe("10,000");
    expect(RunModel.FinalValue.DetailText).toBe(
      "lcm = (1,000,000 x 10,000) / 10,000 = 1,000,000",
    );
  });

  it("describes Euclidean as repeated division before reading gcd and lcm", () => {
    const RunModel = BuildEuclideanRun(252, 105);
    const FinalStep = RunModel.Steps[RunModel.Steps.length - 1];

    expect(RunModel.Steps[1]?.Title).toBe("Repeat the division algorithm");
    expect(RunModel.Steps[1]?.Body).toContain(
      "previous divisor become the next dividend",
    );
    expect(FinalStep?.Body).toContain("previous non-zero remainder is the gcd");
    expect(FinalStep?.Body).toContain("divide by the gcd to get the lcm");
  });

  it("reports palindrome and non-palindrome outcomes", () => {
    expect(BuildPalindromeRun("Level").FinalValue.Number).toBe("Palindrome");
    expect(BuildPalindromeRun("hello").FinalValue.Number).toBe("Not a palindrome");
  });

  it("accepts the empty string as a palindrome input", () => {
    const RuntimeResult = BuildTopicPresentation(PalindromeContent, {
      Candidate: "",
    });

    expect(RuntimeResult.IsValid).toBe(true);

    if (RuntimeResult.IsValid) {
      expect(RuntimeResult.Presentation.FinalValue.Number).toBe("Palindrome");
      expect(RuntimeResult.Presentation.FinalValue.Notation).toBe('P = ""');
      expect(RuntimeResult.Presentation.FinalValue.DetailText).toBe(
        "Compared as: (empty string)",
      );
    }
  });

  it("normalizes palindrome letter input before comparison", () => {
    const RunModel = BuildPalindromeRun("Never odd or even");

    expect(RunModel.FinalValue.Number).toBe("Palindrome");
    expect(RunModel.FinalValue.DetailText).toBe(
      "Compared as: n e v e r o d d o r e v e n",
    );
  });

  it("describes the unequal palindrome comparison before stopping", () => {
    const RunModel = BuildPalindromeRun("racetar");
    const FinalStep = RunModel.Steps[RunModel.Steps.length - 1];

    expect(FinalStep?.Title).toBe("Compare positions 3 and 5");
    expect(FinalStep?.Body).toBe("c on the left is compared with t on the right.");
    expect(FinalStep?.BodyParts).toEqual([
      { Text: "c", Tone: "focus" },
      { Text: " on the left is compared with " },
      { Text: "t", Tone: "focus" },
      { Text: " on the right." },
    ]);
    expect(FinalStep?.Emphasis).toContain("candidate is not a palindrome");
  });
});

describe("numeric validation", () => {
  it("rejects empty values", () => {
    expect(
      ValidateWholeNumberInput("", {
        Label: "Number of terms",
        Minimum: 2,
        Maximum: 25,
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Enter number of terms.",
    });
  });

  it("rejects values below the minimum", () => {
    expect(
      ValidateWholeNumberInput("1", {
        Label: "Number of terms",
        Minimum: 2,
        Maximum: 25,
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Number of terms must be at least 2.",
    });
  });

  it("rejects values above the maximum", () => {
    expect(
      ValidateWholeNumberInput("26", {
        Label: "Number of terms",
        Minimum: 2,
        Maximum: 25,
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Number of terms must be at most 25.",
    });
  });

  it("accepts whole numbers in range", () => {
    expect(
      ValidateWholeNumberInput("8", {
        Label: "Number of terms",
        Minimum: 2,
        Maximum: 25,
      }),
    ).toEqual({
      IsValid: true,
      ParsedValue: 8,
    });
  });
});

describe("text validation", () => {
  it("accepts empty text when the minimum length is 0", () => {
    expect(
      ValidateTextInput("", {
        Label: "Word or text",
        MinimumLength: 0,
        MaximumLength: 1_000,
        Pattern: /^[a-z0-9\s]+$/i,
        AllowedDescription: "letters, digits, and spaces only",
      }),
    ).toEqual({
      IsValid: true,
      ParsedValue: "",
    });
  });

  it("rejects punctuation in palindrome text", () => {
    expect(
      ValidateTextInput("race-car", {
        Label: "Word or text",
        MinimumLength: 0,
        MaximumLength: 1_000,
        Pattern: /^[a-z0-9\s]+$/i,
        AllowedDescription: "letters, digits, and spaces only",
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Word or text must use letters, digits, and spaces only.",
    });
  });

  it("rejects palindrome text that exceeds the maximum length", () => {
    expect(
      ValidateTextInput("a".repeat(1_001), {
        Label: "Word or text",
        MinimumLength: 0,
        MaximumLength: 1_000,
        Pattern: /^[a-z0-9\s]+$/i,
        AllowedDescription: "letters, digits, and spaces only",
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Word or text must be at most 1000 characters.",
    });
  });
});
