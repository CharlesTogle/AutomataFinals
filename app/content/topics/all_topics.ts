import { CollatzContent } from "./collatz";
import { DivisionContent } from "./division";
import { EuclideanContent } from "./euclidean";
import { FibonacciContent } from "./fibonacci";
import { LucasNumbersContent } from "./lucas_numbers";
import { PalindromeContent } from "./palindrome";
import { TribonacciContent } from "./tribonacci";

export const AllTopics = [
  FibonacciContent,
  LucasNumbersContent,
  TribonacciContent,
  PalindromeContent,
  DivisionContent,
  EuclideanContent,
  CollatzContent,
] as const;
