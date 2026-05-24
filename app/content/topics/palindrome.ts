import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const PalindromeContent: TopicContent = {
  Slug: "palindrome",
  Path: "/palindrome",
  Number: "04",
  ViewKind: "procedure",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Palindrome", IsEmphasized: true }],
  HeroDescription:
    `A palindrome is a word, number, sentence, or verse that reads the same backward and forward ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
  DescriptionHtml:
    `Britannica treats palindrome as a general pattern of reversal symmetry rather than a number-only idea; this page applies that definition to normalized user input by comparing mirrored characters step by step ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
  DescriptionCards: [
    {
      Label: "Definition",
      Value: "Reads the same backward and forward",
      Detail: `General definition ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
    },
    {
      Label: "Forms noted",
      Value: "Word, number, sentence, or verse",
      Detail: `Examples listed by Britannica ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
    },
    {
      Label: "Etymology",
      Value: "From Greek for 'running back again'",
      Detail: `Origin note ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
    },
  ],
  Definition: {
    IntroHtml:
      `Let the characters of <strong>P</strong> be compared from the outside inward to test whether the input satisfies the palindrome definition ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
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
      MinimumLength: 0,
      MaximumLength: TopicInputLimits.PalindromeCandidateMaxLength,
      ConstraintText:
        "Letters and digits only, spaces allowed, 0 to 1,000 characters. Empty input counts as a palindrome. Case is ignored.",
      HelpText:
        "Enter letters or digits. Spaces are allowed and ignored during comparison. Empty input is treated as a palindrome.",
    },
  ],
  Legend: [],
  ResultLabel: "Result",
};
