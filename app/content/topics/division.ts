import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const DivisionContent: TopicContent = {
  Slug: "division",
  Path: "/division",
  Number: "05",
  ViewKind: "procedure",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Division", IsEmphasized: true }],
  HeroDescription:
    `For integers a and b with b not equal to 0, division with remainder finds integers q and r such that a = bq + r and 0 <= r < |b| ${ScholarlyReferences.Division.ParentheticalCitation}.`,
  DescriptionHtml:
    `Encyclopedia of Mathematics distinguishes ordinary division from division with remainder and emphasizes that the quotient-remainder pair exists uniquely for integer inputs with nonzero divisor ${ScholarlyReferences.Division.ParentheticalCitation}.`,
  DescriptionCards: [
    {
      Label: "Equation",
      Value: "a = bq + r",
      Detail: `Standard form ${ScholarlyReferences.Division.ParentheticalCitation}.`,
    },
    {
      Label: "Remainder bound",
      Value: "0 <= r < |b|",
      Detail: `Constraint on the remainder ${ScholarlyReferences.Division.ParentheticalCitation}.`,
    },
    {
      Label: "Guarantee",
      Value: "Quotient and remainder are unique",
      Detail: `Uniqueness statement ${ScholarlyReferences.Division.ParentheticalCitation}.`,
    },
  ],
  Definition: {
    IntroHtml:
      `For integers <strong>m</strong> and <strong>n</strong> with <strong>n &gt; 0</strong>, division with remainder writes ${ScholarlyReferences.Division.ParentheticalCitation}.`,
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
