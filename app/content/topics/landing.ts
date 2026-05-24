import type { LandingCard } from "./topic_types";
import { ScholarlyReferences } from "./scholarly_references";

export const LandingHero = {
  Label: "Mathematical Foundations",
  TitleParts: [
    { Text: "Automata" },
    { Text: "Computation Lab", IsEmphasized: true },
  ],
  Description:
    "Seven mathematical and algorithmic topics presented through one consistent interface. Explore each visualization without leaving the approved design system.",
};

export const LandingCards: LandingCard[] = [
  {
    Number: "01",
    Name: "Fibonacci",
    Description:
      `Each term is the sum of the two preceding terms, with 0 and 1 as the standard zero-based seeds ${ScholarlyReferences.FibonacciSequence.ParentheticalCitation}.`,
    Preview: "0, 1, 1, 2, 3, 5, 8, 13 ...",
    Path: "/fibonacci",
  },
  {
    Number: "02",
    Name: "Lucas Numbers",
    Description:
      `The same recurrence as Fibonacci, but with the zero-based seeds 2 and 1 ${ScholarlyReferences.LucasSequence.ParentheticalCitation}.`,
    Preview: "2, 1, 3, 4, 7, 11, 18, 29 ...",
    Path: "/lucas-numbers",
  },
  {
    Number: "03",
    Name: "Tribonacci",
    Description:
      `Each term depends on the three preceding values, often with zero-based seeds 0, 0, and 1 ${ScholarlyReferences.TribonacciSequence.ParentheticalCitation}.`,
    Preview: "0, 0, 1, 1, 2, 4, 7, 13 ...",
    Path: "/tribonacci",
  },
  {
    Number: "04",
    Name: "Palindrome",
    Description:
      `A palindrome reads the same backward and forward, whether it is a word, number, sentence, or verse ${ScholarlyReferences.Palindrome.ParentheticalCitation}.`,
    Preview: "1331 -> palindrome",
    Path: "/palindrome",
  },
  {
    Number: "05",
    Name: "Division",
    Description:
      `Division with remainder finds q and r such that a = bq + r and 0 <= r < |b| ${ScholarlyReferences.Division.ParentheticalCitation}.`,
    Preview: "42 = 5(8) + 2",
    Path: "/division",
  },
  {
    Number: "06",
    Name: "Euclidean",
    Description:
      `Repeated division with remainder yields the greatest common divisor ${ScholarlyReferences.EuclideanAlgorithm.ParentheticalCitation}.`,
    Preview: "252, 105 -> gcd 21",
    Path: "/euclidean",
  },
  {
    Number: "07",
    Name: "Collatz",
    Description:
      `Even values are halved and odd values become 3n + 1 in the Collatz map ${ScholarlyReferences.CollatzProblem.ParentheticalCitation}.`,
    Preview: "7, 22, 11, 34, 17, 52 ...",
    Path: "/collatz",
  },
];
