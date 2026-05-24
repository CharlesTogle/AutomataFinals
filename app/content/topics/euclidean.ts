import { TopicInputLimits } from "~/global/constants";
import { ScholarlyReferences } from "./scholarly_references";

import type { TopicContent } from "./topic_types";

export const EuclideanContent: TopicContent = {
  Slug: "euclidean",
  Path: "/euclidean",
  Number: "06",
  ViewKind: "procedure",
  BackLabel: "All Topics",
  TitleParts: [{ Text: "Euclidean", IsEmphasized: true }],
  HeroDescription:
    `The Euclidean algorithm repeats the division algorithm until the remainder becomes zero, yielding the gcd first and the lcm from that gcd ${ScholarlyReferences.EuclideanAlgorithm.ParentheticalCitation}.`,
  DescriptionHtml:
    `Britannica traces the method to Euclid's <em>Elements</em>. In this topic, the procedure follows the same division-with-remainder pattern each round: the previous divisor becomes the next dividend, the previous remainder becomes the next divisor, and the process stops when the remainder is 0 ${ScholarlyReferences.EuclideanAlgorithm.ParentheticalCitation}.`,
  DescriptionCards: [
    {
      Label: "Built from",
      Value: "Repeated division algorithm",
      Detail: "Each step reuses m = nq + r before moving to the next pair.",
    },
    {
      Label: "Update rule",
      Value: "Previous divisor -> next dividend",
      Detail: "Previous remainder -> next divisor.",
    },
    {
      Label: "Outputs",
      Value: "Last nonzero remainder = GCD",
      Detail: "Use the gcd to compute the least common multiple.",
    },
  ],
  Definition: {
    IntroHtml:
      `Given positive integers <strong>m</strong> and <strong>n</strong>, start with one division step and keep carrying the divisor and remainder into the next step ${ScholarlyReferences.EuclideanAlgorithm.ParentheticalCitation}.`,
    LabelHtml: "Step rule:",
    FormulaHtml: "m = n q + r",
    ConditionHtml: "Replace (m, n) with (n, r) until r = 0, then compute lcm = (m x n) / gcd",
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
