import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const CollatzContent: TopicContent = {
  Slug: "collatz",
  Path: "/collatz",
  Number: "07",
  Tag: "Iterative",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Collatz", IsEmphasized: true }],
  HeroDescription:
    "The Collatz process transforms one starting integer at a time: halve even values, or multiply odd values by three and add one. The chain continues until it reaches 1.",
  DescriptionHtml:
    "The reference logic used an odd starting value, but the page contract in this project accepts a positive integer and then follows the classic Collatz transformation order. The visualization keeps the generated chain visible as a real evolving sequence instead of collapsing the result into a single line.",
  DescriptionCards: [
    { Label: "Associated Mathematician", Value: "Lothar Collatz" },
    { Label: "Rule", Value: "n / 2 or 3n + 1" },
    { Label: "Constraint", Value: "1 to 999,999" },
  ],
  Definition: {
    IntroHtml:
      "The Collatz process starts from a positive integer <strong>C<sub>0</sub></strong>",
    LabelHtml: "Apply the step rule:",
    FormulaHtml:
      "If C<sub>k</sub> is even, divide by 2. If C<sub>k</sub> is odd, compute 3C<sub>k</sub> + 1.",
    ConditionHtml: "Continue until the value reaches 1",
  },
  Inputs: [
    {
      Key: "StartValue",
      Label: "Starting value",
      Placeholder: "7",
      DefaultValue: "7",
      Minimum: TopicInputLimits.PositiveIntegerMin,
      Maximum: TopicInputLimits.CollatzStartMax,
      HelpText: "Enter a positive integer.",
    },
  ],
  Legend: [
    { Tone: "even", Label: "/2" },
    { Tone: "odd", Label: "3n + 1" },
  ],
  ResultLabel: "Termination Value",
};
