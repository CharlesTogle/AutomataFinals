import type { Route } from "./+types/euclidean";
import { EuclideanContent } from "~/content/topics/euclidean";
import { EuclideanPage } from "~/pages/euclidean_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Euclidean - Final Project",
    },
    {
      name: "description",
      content: EuclideanContent.HeroDescription,
    },
  ];
}

export default function EuclideanRoute() {
  return <EuclideanPage />;
}
