import type { Route } from "./+types/collatz";
import { CollatzContent } from "~/content/topics/collatz";
import { CollatzPage } from "~/pages/collatz_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Collatz - Final Project",
    },
    {
      name: "description",
      content: CollatzContent.HeroDescription,
    },
  ];
}

export default function CollatzRoute() {
  return <CollatzPage />;
}
