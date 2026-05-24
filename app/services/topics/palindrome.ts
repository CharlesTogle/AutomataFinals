import { BuildProcedureRun } from "../visualization/procedure_steps";
import type { ProcedureRunModel, ProcedureStepModel } from "../visualization/types";

function NormalizeCandidateText(CandidateText: string): string {
  return CandidateText.toLowerCase().replace(/\s+/g, "");
}

export function BuildPalindromeRun(Candidate: string): ProcedureRunModel {
  const CandidateText = Candidate.trim();
  const ComparableText = NormalizeCandidateText(CandidateText);
  const CandidateDisplay = CandidateText.length > 0 ? CandidateText : "\"\"";
  const ComparableDisplay =
    ComparableText.length > 0 ? ComparableText.split("").join(" ") : "(empty string)";
  const Steps: ProcedureStepModel[] = [];
  let LeftIndex = 0;
  let RightIndex = ComparableText.length - 1;
  let StepNumber = 1;
  let IsPalindrome = true;

  if (ComparableText !== CandidateText) {
    Steps.push({
      Id: "normalize",
      Label: `Step ${StepNumber}`,
      Title: "Normalize the text",
      Body: "Convert letters to lowercase and remove spaces before mirrored comparison.",
      Emphasis: `${CandidateText} → ${ComparableText}`,
    });
    StepNumber += 1;
  }

  if (ComparableText.length === 0) {
    Steps.push({
      Id: "empty-string",
      Label: `Step ${StepNumber}`,
      Title: "Empty string",
      Body: "An empty string reads the same forward and backward.",
      Emphasis: "The candidate is a palindrome.",
    });
  }

  if (ComparableText.length === 1) {
    Steps.push({
      Id: "single-character",
      Label: `Step ${StepNumber}`,
      Title: "Single character",
      Body: "A one-character value reads the same in both directions.",
      Emphasis: "The candidate is a palindrome.",
    });
  }

  while (LeftIndex < RightIndex) {
    const LeftCharacter = ComparableText[LeftIndex];
    const RightCharacter = ComparableText[RightIndex];
    const CharactersMatch = LeftCharacter === RightCharacter;

    Steps.push({
      Id: `compare-${LeftIndex}-${RightIndex}`,
      Label: `Step ${StepNumber}`,
      Title: `Compare positions ${LeftIndex + 1} and ${RightIndex + 1}`,
      Body: `${LeftCharacter} on the left is compared with ${RightCharacter} on the right.`,
      Emphasis: CharactersMatch
        ? "The characters match, so the pointers move inward."
        : "The characters differ, so the process stops here.",
    });

    if (!CharactersMatch) {
      IsPalindrome = false;
      break;
    }

    LeftIndex += 1;
    RightIndex -= 1;
    StepNumber += 1;
  }

  if (IsPalindrome && ComparableText.length > 1) {
    Steps.push({
      Id: "middle-reached",
      Label: `Step ${StepNumber}`,
      Title: "Middle reached",
      Body: "Every mirrored pair matched before the pointers crossed.",
      Emphasis: "The candidate is a palindrome.",
    });
  }

  return BuildProcedureRun(Steps, {
    Label: "Result",
    Notation: `P = ${CandidateDisplay}`,
    Number: IsPalindrome ? "Palindrome" : "Not a palindrome",
    DetailText: `Compared as: ${ComparableDisplay}`,
  });
}
