import {
  BuildSequencePreviewDetail,
  BuildSequenceSummaryText,
  GetSequencePreviewCount,
} from "./sequence_preview";
import { BuildRecursiveSequenceRun } from "../visualization/sequence_steps";
import type { SequenceRunModel } from "../visualization/types";

export function BuildLucasNumbersSequence(TermCount: number): number[] {
  const Values: number[] = [];
  let PreviousValue = 2;
  let CurrentValue = 1;

  for (let Index = 0; Index < TermCount; Index += 1) {
    if (Index === 0) {
      Values.push(2);
      continue;
    }

    if (Index === 1) {
      Values.push(1);
      continue;
    }

    const NextValue = PreviousValue + CurrentValue;
    Values.push(NextValue);
    PreviousValue = CurrentValue;
    CurrentValue = NextValue;
  }

  return Values;
}

function BuildLucasPreview(TermCount: number): {
  PreviewValues: bigint[];
  FinalValue: bigint;
} {
  const PreviewValues: bigint[] = [];
  const PreviewCount = GetSequencePreviewCount(TermCount);
  let PreviousValue = 2n;
  let CurrentValue = 1n;
  let FinalValue = 2n;

  for (let Index = 0; Index < TermCount; Index += 1) {
    if (Index === 0) {
      FinalValue = 2n;
    } else if (Index === 1) {
      FinalValue = 1n;
    } else {
      const NextValue = PreviousValue + CurrentValue;
      FinalValue = NextValue;
      PreviousValue = CurrentValue;
      CurrentValue = NextValue;
    }

    if (Index < PreviewCount) {
      PreviewValues.push(FinalValue);
    }
  }

  return {
    PreviewValues,
    FinalValue,
  };
}

export function BuildLucasNumbersRun(TermCount: number): SequenceRunModel {
  const PreviewCount = GetSequencePreviewCount(TermCount);
  const SequencePreview = BuildLucasPreview(TermCount);

  return BuildRecursiveSequenceRun({
    Values: SequencePreview.PreviewValues,
    NotationPrefix: "L",
    BaseCount: 2,
    Dependencies: [
      { Offset: 1, Tone: "near" },
      { Offset: 2, Tone: "far" },
    ],
    Legend: [
      { Tone: "far", Label: "L(n−2) → L(n)" },
      { Tone: "near", Label: "L(n−1) → L(n)" },
    ],
    FinalLabel: "Final Value",
    FinalIndex: TermCount - 1,
    FinalValue: SequencePreview.FinalValue,
    FinalSequenceText: BuildSequenceSummaryText(
      SequencePreview.PreviewValues,
      SequencePreview.FinalValue,
      TermCount,
    ),
    FinalDetailText: BuildSequencePreviewDetail("L", PreviewCount, TermCount),
  });
}
