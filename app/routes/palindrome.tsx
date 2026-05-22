import type { Route } from "./+types/palindrome";
import { PalindromeContent } from "~/content/topics/palindrome";
import { PalindromePage } from "~/pages/palindrome_page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Palindrome - Final Project",
    },
    {
      name: "description",
      content: PalindromeContent.HeroDescription,
    },
  ];
}

export default function PalindromeRoute() {
  return <PalindromePage />;
}
