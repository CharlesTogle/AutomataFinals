import { TopicInputLimits } from "~/global/constants";

import type { TopicContent } from "./topic_types";

export const EuclideanContent: TopicContent = {
  Slug: "euclidean",
  Path: "/euclidean",
  Number: "06",
  Tag: "Procedure",
  ViewKind: "procedure",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Euclidean", IsEmphasized: true }],
  HeroDescription:
    "The Euclidean Algorithm repeatedly divides one integer by another and replaces the pair with the divisor and remainder. The process continues until the remainder becomes zero.",
  DescriptionHtml:
    "This page follows the reference loop structure and surfaces every division step, then reports the greatest common divisor together with the least common multiple derived from it.",
  DescriptionCards: [
    { Label: "Associated Mathematician", Value: "Euclid" },
    { Label: "Output", Value: "GCD and LCM" },
    { Label: "Constraint", Value: "1 to 999,999" },
  ],
  Definition: {
    IntroHtml:
      "Given positive integers <strong>m</strong> and <strong>n</strong>, repeatedly divide the larger by the smaller",
    LabelHtml: "Step rule:",
    FormulaHtml: "m = n q + r",
    ConditionHtml: "Replace (m, n) with (n, r) until r = 0",
  },
  Inputs: [
    {
      Key: "FirstValue",
      Label: "First integer",
      Placeholder: "252",
      DefaultValue: "252",
      Minimum: TopicInputLimits.PositiveIntegerMin,
      Maximum: TopicInputLimits.EuclideanOperandMax,
      HelpText: "Positive integer.",
    },
    {
      Key: "SecondValue",
      Label: "Second integer",
      Placeholder: "105",
      DefaultValue: "105",
      Minimum: TopicInputLimits.PositiveIntegerMin,
      Maximum: TopicInputLimits.EuclideanOperandMax,
      HelpText: "Positive integer.",
    },
  ],
  Legend: [],
  ResultLabel: "Final Result",
};
