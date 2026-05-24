import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const FibonacciContent: TopicContent = {
  Slug: "fibonacci",
  Path: "/fibonacci",
  Number: "01",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Fibonacci", IsEmphasized: true }],
  HeroDescription:
    `In the zero-based convention used here, F(0) = 0 and F(1) = 1, and every later term is the sum of the two preceding terms ${ScholarlyReferences.FibonacciSequence.ParentheticalCitation}.`,
  DescriptionHtml:
    "MacTutor traces the sequence's best-known medieval appearance to the rabbit problem in <em>Liber abaci</em> (1202), while MathWorld presents Fibonacci numbers as a standard linear recurrence and companion to Lucas numbers (O'Connor & Robertson, 1998; Chandra & Weisstein, n.d.).",
  DescriptionCards: [
    {
      Label: "Historical source",
      Value: "Rabbit problem in Liber abaci (1202)",
      Detail: `Documented by MacTutor ${ScholarlyReferences.FibonacciHistory.ParentheticalCitation}.`,
    },
    {
      Label: "Zero-based seeds",
      Value: "F(0) = 0, F(1) = 1",
      Detail: `Sequence definition ${ScholarlyReferences.FibonacciSequence.ParentheticalCitation}.`,
    },
    {
      Label: "Family relation",
      Value: "Same recurrence as Lucas numbers",
      Detail: `Companion recurrence description ${ScholarlyReferences.FibonacciSequence.ParentheticalCitation}.`,
    },
  ],
  Definition: {
    IntroHtml:
      `The Fibonacci numbers <strong>F<sub>n</sub></strong> can be written in zero-based form with <strong>F<sub>0</sub> = 0,&nbsp; F<sub>1</sub> = 1</strong> ${ScholarlyReferences.FibonacciSequence.ParentheticalCitation}.`,
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
        "Choose from 1 to 100,000 terms. The first 100 terms are animated.",
    },
  ],
  Legend: [
    { Tone: "far", Label: "F(n-2) -> F(n)" },
    { Tone: "near", Label: "F(n-1) -> F(n)" },
  ],
  ResultLabel: "Final Value",
};
