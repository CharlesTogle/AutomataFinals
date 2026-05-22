import type { Route } from "./+types/division";
import { DivisionContent } from "~/content/topics/division";
import { DivisionPage } from "~/pages/division_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Division - Final Project",
    },
    {
      name: "description",
      content: DivisionContent.HeroDescription,
    },
  ];
}

export default function DivisionRoute() {
  return <DivisionPage />;
}
