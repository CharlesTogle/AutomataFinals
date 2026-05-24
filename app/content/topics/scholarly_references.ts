export type SiteReference = {
  Key: string;
  ParentheticalCitation: string;
  ApaText: string;
};

export const ScholarlyReferences = {
  Palindrome: {
    Key: "palindrome",
    ParentheticalCitation: "(Britannica Editors, n.d.)",
    ApaText:
      "Britannica Editors. (n.d.). Palindrome. Encyclopaedia Britannica. https://www.britannica.com/art/palindrome",
  },
  EuclideanAlgorithm: {
    Key: "euclidean-algorithm",
    ParentheticalCitation: "(Britannica Editors, 2026)",
    ApaText:
      "Britannica Editors. (2026, March 10). Euclidean algorithm. Encyclopaedia Britannica. https://www.britannica.com/science/Euclidean-algorithm",
  },
  FibonacciSequence: {
    Key: "fibonacci-sequence",
    ParentheticalCitation: "(Chandra & Weisstein, n.d.)",
    ApaText:
      "Chandra, P., & Weisstein, E. W. (n.d.). Fibonacci number. MathWorld--A Wolfram Resource. https://mathworld.wolfram.com/FibonacciNumber.html",
  },
  Division: {
    Key: "division",
    ParentheticalCitation: "(Encyclopedia of Mathematics, 2018)",
    ApaText:
      "Encyclopedia of Mathematics. (2018, December 30). Division. https://encyclopediaofmath.org/wiki/Division",
  },
  TribonacciSequence: {
    Key: "tribonacci-sequence",
    ParentheticalCitation: "(Noe et al., n.d.)",
    ApaText:
      "Noe, T., Piezas III, T., & Weisstein, E. W. (n.d.). Tribonacci number. MathWorld--A Wolfram Resource. https://mathworld.wolfram.com/TribonacciNumber.html",
  },
  LucasHistory: {
    Key: "lucas-history",
    ParentheticalCitation: "(O'Connor & Robertson, 1996)",
    ApaText:
      "O'Connor, J. J., & Robertson, E. F. (1996, December). Francois Edouard Anatole Lucas. MacTutor History of Mathematics Archive. https://mathshistory.st-andrews.ac.uk/Biographies/Lucas/",
  },
  FibonacciHistory: {
    Key: "fibonacci-history",
    ParentheticalCitation: "(O'Connor & Robertson, 1998)",
    ApaText:
      "O'Connor, J. J., & Robertson, E. F. (1998, October). Leonardo Pisano Fibonacci. MacTutor History of Mathematics Archive. https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/",
  },
  CollatzProblem: {
    Key: "collatz-problem",
    ParentheticalCitation: "(Weisstein, n.d.-a)",
    ApaText:
      "Weisstein, E. W. (n.d.-a). Collatz problem. MathWorld--A Wolfram Resource. https://mathworld.wolfram.com/CollatzProblem.html",
  },
  LucasSequence: {
    Key: "lucas-sequence",
    ParentheticalCitation: "(Weisstein, n.d.-b)",
    ApaText:
      "Weisstein, E. W. (n.d.-b). Lucas number. MathWorld--A Wolfram Resource. https://mathworld.wolfram.com/LucasNumber.html",
  },
} as const satisfies Record<string, SiteReference>;

export const LandingReferences = [
  ScholarlyReferences.EuclideanAlgorithm,
  ScholarlyReferences.Palindrome,
  ScholarlyReferences.FibonacciSequence,
  ScholarlyReferences.Division,
  ScholarlyReferences.TribonacciSequence,
  ScholarlyReferences.LucasHistory,
  ScholarlyReferences.FibonacciHistory,
  ScholarlyReferences.CollatzProblem,
  ScholarlyReferences.LucasSequence,
] as const satisfies readonly SiteReference[];
