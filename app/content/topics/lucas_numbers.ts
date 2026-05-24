import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const LucasNumbersContent: TopicContent = {
  Slug: "lucas-numbers",
  Path: "/lucas-numbers",
  Number: "02",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Lucas" }, { Text: "Numbers", IsEmphasized: true }],
  HeroDescription:
    `With the zero-based seeds L(0) = 2 and L(1) = 1, Lucas numbers follow the same recurrence as Fibonacci while producing a distinct companion sequence ${ScholarlyReferences.LucasSequence.ParentheticalCitation}.`,
  DescriptionHtml:
    "MacTutor notes that Edouard Lucas studied Fibonacci-related number theory in the nineteenth century, and MathWorld describes Lucas numbers as the companion sequence that keeps Fibonacci's recurrence but changes the starting values (O'Connor & Robertson, 1996; Weisstein, n.d.-b).",
  DescriptionCards: [
    {
      Label: "Named for",
      Value: "Edouard Lucas",
      Detail: `Biographical context ${ScholarlyReferences.LucasHistory.ParentheticalCitation}.`,
    },
    {
      Label: "Zero-based seeds",
      Value: "L(0) = 2, L(1) = 1",
      Detail: `Sequence definition ${ScholarlyReferences.LucasSequence.ParentheticalCitation}.`,
    },
    {
      Label: "Family relation",
      Value: "Same recurrence as Fibonacci",
      Detail: `Companion-sequence description ${ScholarlyReferences.LucasSequence.ParentheticalCitation}.`,
    },
  ],
  Definition: {
    IntroHtml:
      `The Lucas numbers <strong>L<sub>n</sub></strong> have the initial values ${ScholarlyReferences.LucasSequence.ParentheticalCitation}.`,
    SeedHtml: "L<sub>0</sub> = 2 &nbsp;,&nbsp; L<sub>1</sub> = 1",
    LabelHtml: "And the recursion:",
    FormulaHtml:
      "L<sub>n</sub> = L<sub>n&minus;1</sub> + L<sub>n&minus;2</sub>",
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
    { Tone: "far", Label: "L(n-2) -> L(n)" },
    { Tone: "near", Label: "L(n-1) -> L(n)" },
  ],
  ResultLabel: "Final Value",
};
