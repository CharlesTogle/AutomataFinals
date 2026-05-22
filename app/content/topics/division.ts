import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const DivisionContent: TopicContent = {
  Slug: "division",
  Path: "/division",
  Number: "05",
  Tag: "Procedure",
  ViewKind: "procedure",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Division", IsEmphasized: true }],
  HeroDescription:
    "The Division Algorithm expresses one integer as a product plus a remainder. This page shows how the dividend, divisor, quotient, and remainder are derived from the two inputs.",
  DescriptionHtml:
    "The reference implementation normalizes the inputs by treating the larger value as the dividend and the smaller value as the divisor. The step view makes that normalization explicit before the final equation appears.",
  DescriptionCards: [
    { Label: "Rule", Value: "m = nq + r" },
    { Label: "Input Shape", Value: "Two positive integers" },
    { Label: "Constraint", Value: "1 to 999,999" },
  ],
  Definition: {
    IntroHtml:
      "For integers <strong>m</strong> and <strong>n</strong> with <strong>n &gt; 0</strong>, the Division Algorithm writes",
    LabelHtml: "Equation:",
    FormulaHtml: "m = n q + r",
    ConditionHtml: "Where 0 &le; r &lt; n",
  },
  Inputs: [
    {
      Key: "FirstValue",
      Label: "First integer",
      Placeholder: "42",
      DefaultValue: "42",
      Minimum: TopicInputLimits.PositiveIntegerMin,
      Maximum: TopicInputLimits.DivisionOperandMax,
      HelpText: "Positive integer.",
    },
    {
      Key: "SecondValue",
      Label: "Second integer",
      Placeholder: "5",
      DefaultValue: "5",
      Minimum: TopicInputLimits.PositiveIntegerMin,
      Maximum: TopicInputLimits.DivisionOperandMax,
      HelpText: "Positive integer.",
    },
  ],
  Legend: [],
  ResultLabel: "Final Equation",
};
