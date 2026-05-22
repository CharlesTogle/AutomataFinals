import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const TribonacciContent: TopicContent = {
  Slug: "tribonacci",
  Path: "/tribonacci",
  Number: "03",
  Tag: "Generalized",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Tribonacci", IsEmphasized: true }],
  HeroDescription:
    "Tribonacci extends the same recursive idea one step further: each term depends on the three preceding values instead of two. The baseline seeds used here are T(0) = 0, T(1) = 0, and T(2) = 1.",
  DescriptionHtml:
    "This page adapts the two-arc sequence language from Fibonacci and Lucas into a three-source recurrence. The result is a denser dependency graph that makes the extra recursive input visible instead of leaving it hidden in a formula.",
  DescriptionCards: [
    { Label: "Seeds", Value: "T(0) = 0, T(1) = 0, T(2) = 1" },
    { Label: "Rule", Value: "Three prior terms" },
    { Label: "Constraint", Value: "2 to 100,000 terms" },
  ],
  Definition: {
    IntroHtml:
      "The Tribonacci Numbers <strong>T<sub>n</sub></strong> begin with <strong>T<sub>0</sub> = 0,&nbsp; T<sub>1</sub> = 0,&nbsp; T<sub>2</sub> = 1</strong>",
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
        "Choose from 2 to 100,000 terms. The first 100 terms are animated.",
    },
  ],
  Legend: [
    { Tone: "far", Label: "T(n-3) -> T(n)" },
    { Tone: "mid", Label: "T(n-2) -> T(n)" },
    { Tone: "near", Label: "T(n-1) -> T(n)" },
  ],
  ResultLabel: "Final Value",
};
