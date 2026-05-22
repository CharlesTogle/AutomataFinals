import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const LucasNumbersContent: TopicContent = {
  Slug: "lucas-numbers",
  Path: "/lucas-numbers",
  Number: "02",
  Tag: "Variant",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Lucas" }, { Text: "Numbers", IsEmphasized: true }],
  HeroDescription:
    "Lucas Numbers use the same recurrence as Fibonacci, but they begin with L(0) = 2 and L(1) = 1. That change in seeds creates a different sequence while preserving the same recursive structure.",
  DescriptionHtml:
    "Lucas Numbers are named after the French mathematician Edouard Lucas, who studied related recurrence patterns in the nineteenth century. The page highlights how identical recursion can still produce a different sequence once the starting values change.",
  DescriptionCards: [
    { Label: "Associated Mathematician", Value: "Edouard Lucas" },
    { Label: "Seeds", Value: "L(0) = 2, L(1) = 1" },
    { Label: "Constraint", Value: "2 to 100,000 terms" },
  ],
  Definition: {
    IntroHtml:
      "The Lucas Numbers <strong>L<sub>n</sub></strong> have the initial values",
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
        "Choose from 2 to 100,000 terms. The first 100 terms are animated.",
    },
  ],
  Legend: [
    { Tone: "far", Label: "L(n-2) -> L(n)" },
    { Tone: "near", Label: "L(n-1) -> L(n)" },
  ],
  ResultLabel: "Final Value",
};
