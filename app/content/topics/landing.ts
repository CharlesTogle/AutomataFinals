import type { LandingCard } from "./topic_types";

export const LandingHero = {
  Label: "Mathematical Foundations",
  TitleParts: [
    { Text: "Automata" },
    { Text: "Computation Lab", IsEmphasized: true },
  ],
  Description:
    "Eight mathematical and algorithmic topics presented through one consistent interface. Explore recursive sequences, arithmetic procedures, and step-driven transformations without leaving the approved design system.",
};

export const LandingCards: LandingCard[] = [
  {
    Number: "01",
    Tag: "Recursive",
    Name: "Fibonacci",
    Description:
      "Each term is the sum of the two preceding terms, starting from 0 and 1.",
    Preview: "0, 1, 1, 2, 3, 5, 8, 13 ...",
    Path: "/fibonacci",
  },
  {
    Number: "02",
    Tag: "Variant",
    Name: "Lucas Numbers",
    Description:
      "The same recurrence as Fibonacci, but seeded with 2 and 1.",
    Preview: "2, 1, 3, 4, 7, 11, 18, 29 ...",
    Path: "/lucas-numbers",
  },
  {
    Number: "03",
    Tag: "Generalized",
    Name: "Tribonacci",
    Description:
      "Each term depends on the three preceding values instead of two.",
    Preview: "0, 0, 1, 1, 2, 4, 7, 13 ...",
    Path: "/tribonacci",
  },
  {
    Number: "04",
    Tag: "Procedure",
    Name: "Palindrome",
    Description:
      "Check whether a numeric candidate reads the same in both directions.",
    Preview: "1331 -> palindrome",
    Path: "/palindrome",
  },
  {
    Number: "05",
    Tag: "Procedure",
    Name: "Division",
    Description:
      "Break an integer pair into dividend, divisor, quotient, and remainder.",
    Preview: "42 = 5(8) + 2",
    Path: "/division",
  },
  {
    Number: "06",
    Tag: "Procedure",
    Name: "Euclidean",
    Description:
      "Use repeated division steps to compute the greatest common divisor.",
    Preview: "252, 105 -> gcd 21",
    Path: "/euclidean",
  },
  {
    Number: "07",
    Tag: "Iterative",
    Name: "Collatz",
    Description:
      "Generate a value chain by halving even numbers or applying 3n + 1 to odd numbers.",
    Preview: "7, 22, 11, 34, 17, 52 ...",
    Path: "/collatz",
  },
];
