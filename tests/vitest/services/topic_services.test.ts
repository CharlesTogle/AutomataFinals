import { describe, expect, it } from "vitest";

import { BuildCollatzRun, BuildCollatzSequence } from "~/services/topics/collatz";
import { BuildDivisionRun } from "~/services/topics/division";
import { BuildFibonacciRun, BuildFibonacciSequence } from "~/services/topics/fibonacci";
import { BuildEuclideanRun } from "~/services/topics/euclidean";
import { BuildLucasNumbersSequence } from "~/services/topics/lucas_numbers";
import { BuildPalindromeRun } from "~/services/topics/palindrome";
import { BuildTribonacciSequence } from "~/services/topics/tribonacci";
import { ValidateWholeNumberInput } from "~/services/validation/numeric_input";
import { ValidateTextInput } from "~/services/validation/text_input";

describe("topic services", () => {
  it("builds the expected Fibonacci sequence", () => {
    expect(BuildFibonacciSequence(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
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
    expect(RunModel.FinalValue.DetailText).toContain("1,260");
  });

  it("formats large Euclidean results with comma separators", () => {
    const RunModel = BuildEuclideanRun(1_000_000, 10_000);

    expect(RunModel.FinalValue.Notation).toBe("gcd(1,000,000, 10,000)");
    expect(RunModel.FinalValue.Number).toBe("10,000");
    expect(RunModel.FinalValue.DetailText).toBe("lcm = 1,000,000");
  });

  it("reports palindrome and non-palindrome outcomes", () => {
    expect(BuildPalindromeRun("Level").FinalValue.Number).toBe("Palindrome");
    expect(BuildPalindromeRun("hello").FinalValue.Number).toBe("Not a palindrome");
  });

  it("normalizes palindrome letter input before comparison", () => {
    const RunModel = BuildPalindromeRun("Never odd or even");

    expect(RunModel.FinalValue.Number).toBe("Palindrome");
    expect(RunModel.FinalValue.DetailText).toBe(
      "Compared as: n e v e r o d d o r e v e n",
    );
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
  it("rejects empty text values", () => {
    expect(
      ValidateTextInput("", {
        Label: "Word or text",
        MaximumLength: 32,
        Pattern: /^[a-z0-9\s]+$/i,
        AllowedDescription: "letters, digits, and spaces only",
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Enter word or text.",
    });
  });

  it("rejects punctuation in palindrome text", () => {
    expect(
      ValidateTextInput("race-car", {
        Label: "Word or text",
        MaximumLength: 32,
        Pattern: /^[a-z0-9\s]+$/i,
        AllowedDescription: "letters, digits, and spaces only",
      }),
    ).toEqual({
      IsValid: false,
      ErrorMessage: "Word or text must use letters, digits, and spaces only.",
    });
  });

  it("accepts letters for palindrome text", () => {
    expect(
      ValidateTextInput("Racecar", {
        Label: "Word or text",
        MaximumLength: 32,
        Pattern: /^[a-z0-9\s]+$/i,
        AllowedDescription: "letters, digits, and spaces only",
      }),
    ).toEqual({
      IsValid: true,
      ParsedValue: "Racecar",
    });
  });
});
