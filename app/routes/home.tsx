import type { Route } from "./+types/home";
import { LandingPage } from "~/pages/landing_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Automata Computation Lab - Final Project" },
    {
      name: "description",
      content:
        "An eight-page educational site covering recursive sequences and computational procedures in one consistent visual system.",
    },
  ];
}

export default function Home() {
  return <LandingPage />;
}
