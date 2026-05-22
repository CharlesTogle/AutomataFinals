import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const PalindromeContent: TopicContent = {
  Slug: "palindrome",
  Path: "/palindrome",
  Number: "04",
  Tag: "Procedure",
  ViewKind: "procedure",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Palindrome", IsEmphasized: true }],
  HeroDescription:
    "A palindrome reads the same from left to right and from right to left. This page checks a word, text fragment, or number by comparing mirrored characters step by step.",
  DescriptionHtml:
    "The original reference compares characters from both ends of the input until the middle is reached or a mismatch appears. This version keeps that same mirrored comparison order while allowing letters, digits, and spaces, and it ignores case during the check.",
  DescriptionCards: [
    { Label: "Rule", Value: "Mirror the characters" },
    { Label: "Input Shape", Value: "Letters, digits, and spaces" },
    { Label: "Constraint", Value: "Up to 32 characters" },
  ],
  Definition: {
    IntroHtml:
      "Let the characters of <strong>P</strong> be compared from the outside inward",
    LabelHtml: "Step rule:",
    FormulaHtml:
      "Compare the leftmost and rightmost remaining characters at each step",
    ConditionHtml:
      "Ignore case and spaces, then stop on the first mismatch or when the middle is reached",
  },
  Inputs: [
    {
      Key: "Candidate",
      Label: "Word or text",
      Placeholder: "Racecar",
      DefaultValue: "Racecar",
      InputType: "text",
      InputMode: "text",
      MaximumLength: TopicInputLimits.PalindromeCandidateMaxLength,
      ConstraintText:
        "Letters and digits only, spaces allowed, up to 32 characters. Case is ignored.",
      HelpText:
        "Enter letters or digits. Spaces are allowed and ignored during comparison.",
    },
  ],
  Legend: [],
  ResultLabel: "Result",
};
