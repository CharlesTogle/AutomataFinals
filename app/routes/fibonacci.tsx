import type { Route } from "./+types/fibonacci";
import { FibonacciContent } from "~/content/topics/fibonacci";
import { FibonacciPage } from "~/pages/fibonacci_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Fibonacci - Final Project",
    },
    {
      name: "description",
      content: FibonacciContent.HeroDescription,
    },
  ];
}

export default function FibonacciRoute() {
  return <FibonacciPage />;
}
