import type { Route } from "./+types/lucas_numbers";
import { LucasNumbersContent } from "~/content/topics/lucas_numbers";
import { LucasNumbersPage } from "~/pages/lucas_numbers_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Lucas Numbers - Final Project",
    },
    {
      name: "description",
      content: LucasNumbersContent.HeroDescription,
    },
  ];
}

export default function LucasNumbersRoute() {
  return <LucasNumbersPage />;
}
