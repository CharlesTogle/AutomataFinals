import type { Route } from "./+types/tribonacci";
import { TribonacciContent } from "~/content/topics/tribonacci";
import { TribonacciPage } from "~/pages/tribonacci_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Tribonacci - Final Project",
    },
    {
      name: "description",
      content: TribonacciContent.HeroDescription,
    },
  ];
}

export default function TribonacciRoute() {
  return <TribonacciPage />;
}
