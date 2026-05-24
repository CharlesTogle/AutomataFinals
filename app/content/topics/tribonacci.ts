import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const TribonacciContent: TopicContent = {
  Slug: "tribonacci",
  Path: "/tribonacci",
  Number: "03",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Tribonacci", IsEmphasized: true }],
  HeroDescription:
    `Tribonacci is the third-order extension of Fibonacci-style recurrences: each term depends on the previous three values, and one common zero-based convention starts with T(0) = 0, T(1) = 0, and T(2) = 1 ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
  DescriptionHtml:
    `MathWorld identifies Tribonacci as the n = 3 case of the Fibonacci n-step family and explicitly notes the alternate zero-based indexing used on this page ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
  DescriptionCards: [
    {
      Label: "Zero-based seeds",
      Value: "T(0) = 0, T(1) = 0, T(2) = 1",
      Detail: `Alternate convention noted by MathWorld ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
    },
    {
      Label: "Order",
      Value: "Third-order linear recurrence",
      Detail: `Each new term depends on three previous terms ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
    },
    {
      Label: "Family relation",
      Value: "n = 3 Fibonacci n-step case",
      Detail: `Relationship stated in MathWorld ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
    },
  ],
  Definition: {
    IntroHtml:
      `The Tribonacci numbers <strong>T<sub>n</sub></strong> may begin with <strong>T<sub>0</sub> = 0,&nbsp; T<sub>1</sub> = 0,&nbsp; T<sub>2</sub> = 1</strong> in the zero-based convention used here ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
    LabelHtml: "And the recursion:",
    FormulaHtml:
      "T<sub>n</sub> = T<sub>n&minus;1</sub> + T<sub>n&minus;2</sub> + T<sub>n&minus;3</sub>",
    ConditionHtml: "If n &ge; 3",
  },
  Inputs: [
    {
      Key: "TermCount",
      Label: "Number of terms",
      Placeholder: "8",
      DefaultValue: "8",
      Minimum: TopicInputLimits.SequenceTermsMin,
      Maximum: TopicInputLimits.SequenceTermsMax,
      HelpText:
        "Choose from 1 to 100,000 terms. The first 100 terms are animated.",
    },
  ],
  Legend: [
    { Tone: "far", Label: "T(n-3) -> T(n)" },
    { Tone: "mid", Label: "T(n-2) -> T(n)" },
    { Tone: "near", Label: "T(n-1) -> T(n)" },
  ],
  ResultLabel: "Final Value",
};
