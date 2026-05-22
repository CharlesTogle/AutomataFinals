import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("fibonacci", "routes/fibonacci.tsx"),
  route("lucas-numbers", "routes/lucas_numbers.tsx"),
  route("tribonacci", "routes/tribonacci.tsx"),
  route("collatz", "routes/collatz.tsx"),
  route("palindrome", "routes/palindrome.tsx"),
  route("division", "routes/division.tsx"),
  route("euclidean", "routes/euclidean.tsx"),
] satisfies RouteConfig;
