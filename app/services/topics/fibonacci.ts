import { GetSequencePreviewCount, BuildSequencePreviewDetail, BuildSequenceSummaryText } from "./sequence_preview";
import { BuildRecursiveSequenceRun } from "../visualization/sequence_steps";
import type { SequenceRunModel } from "../visualization/types";

export function BuildFibonacciSequence(TermCount: number): number[] {
  const Values: number[] = [];
  let PreviousValue = 0;
  let CurrentValue = 1;

  for (let Index = 0; Index < TermCount; Index += 1) {
    if (Index === 0) {
      Values.push(0);
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

function BuildFibonacciPreview(TermCount: number): {
  PreviewValues: bigint[];
  FinalValue: bigint;
} {
  const PreviewValues: bigint[] = [];
  const PreviewCount = GetSequencePreviewCount(TermCount);
  let PreviousValue = 0n;
  let CurrentValue = 1n;
  let FinalValue = 0n;

  for (let Index = 0; Index < TermCount; Index += 1) {
    if (Index === 0) {
      FinalValue = 0n;
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

export function BuildFibonacciRun(TermCount: number): SequenceRunModel {
  const PreviewCount = GetSequencePreviewCount(TermCount);
  const SequencePreview = BuildFibonacciPreview(TermCount);

  return BuildRecursiveSequenceRun({
    Values: SequencePreview.PreviewValues,
    NotationPrefix: "F",
    BaseCount: 2,
    Dependencies: [
      { Offset: 1, Tone: "near" },
      { Offset: 2, Tone: "far" },
    ],
    Legend: [
      { Tone: "far", Label: "F(n−2) → F(n)" },
      { Tone: "near", Label: "F(n−1) → F(n)" },
    ],
    FinalLabel: "Final Value",
    FinalIndex: TermCount - 1,
    FinalValue: SequencePreview.FinalValue,
    FinalSequenceText: BuildSequenceSummaryText(
      SequencePreview.PreviewValues,
      SequencePreview.FinalValue,
      TermCount,
    ),
    FinalDetailText: BuildSequencePreviewDetail("F", PreviewCount, TermCount),
  });
}
