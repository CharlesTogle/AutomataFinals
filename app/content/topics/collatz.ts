import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const CollatzContent: TopicContent = {
  Slug: "collatz",
  Path: "/collatz",
  Number: "07",
  ViewKind: "sequence",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Collatz", IsEmphasized: true }],
  HeroDescription:
    `The Collatz map sends even integers to n / 2 and odd integers to 3n + 1; the associated conjecture asks whether every positive starting value eventually reaches 1 ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
  DescriptionHtml:
    `MathWorld records that L. Collatz posed the problem in 1937 and notes that the generated values are often called hailstone numbers or part of the 3n + 1 problem literature ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
  DescriptionCards: [
    {
      Label: "Posed in",
      Value: "1937 by L. Collatz",
      Detail: `Historical note ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
    },
    {
      Label: "Step map",
      Value: "n / 2 if even; 3n + 1 if odd",
      Detail: `Standard rule ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
    },
    {
      Label: "Alternate name",
      Value: "The 3n + 1 problem",
      Detail: `Also discussed as hailstone behavior ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
    },
  ],
  Definition: {
    IntroHtml:
      `The Collatz process starts from a positive integer <strong>C<sub>0</sub></strong> and applies the standard parity-based map ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
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
