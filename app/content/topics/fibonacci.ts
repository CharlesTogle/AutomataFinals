import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const FibonacciContent: TopicContent = {
  Slug: "fibonacci",
  Path: "/fibonacci",
  Number: "01",
  Tag: "Recursive",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Fibonacci", IsEmphasized: true }],
  HeroDescription:
    "Each term is the sum of the two preceding terms, seeded with F(0) = 0 and F(1) = 1. The sequence is a standard example of recursive growth and appears throughout discrete mathematics.",
  DescriptionHtml:
    "The Fibonacci sequence turns two initial seed values into a growing chain of dependent results. In this project, the visualization shows exactly which earlier terms contribute to each new value, so the recurrence stays legible instead of collapsing into a single answer.",
  DescriptionCards: [
    { Label: "Founder", Value: "Leonardo of Pisa (Fibonacci)" },
    { Label: "Seeds", Value: "F(0) = 0, F(1) = 1" },
    { Label: "Constraint", Value: "2 to 100,000 terms" },
  ],
  Definition: {
    IntroHtml:
      "The Fibonacci Numbers <strong>F<sub>n</sub></strong> have the initial values <strong>F<sub>0</sub> = 0,&nbsp; F<sub>1</sub> = 1</strong>",
    LabelHtml: "And the recursion:",
    FormulaHtml:
      "F<sub>n</sub> = F<sub>n&minus;1</sub> + F<sub>n&minus;2</sub>",
    ConditionHtml: "If n &ge; 2",
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
    { Tone: "far", Label: "F(n-2) -> F(n)" },
    { Tone: "near", Label: "F(n-1) -> F(n)" },
  ],
  ResultLabel: "Final Value",
};
