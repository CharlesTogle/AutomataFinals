import {
  BuildSequencePreviewDetail,
  BuildSequenceSummaryText,
  GetSequencePreviewCount,
} from "./sequence_preview";
import { BuildRecursiveSequenceRun } from "../visualization/sequence_steps";
import type { SequenceRunModel } from "../visualization/types";

export function BuildTribonacciSequence(TermCount: number): number[] {
  const Values: number[] = [];
  let ThirdPreviousValue = 0;
  let SecondPreviousValue = 0;
  let PreviousValue = 1;

  for (let Index = 0; Index < TermCount; Index += 1) {
    if (Index === 0 || Index === 1) {
      Values.push(0);
      continue;
    }

    if (Index === 2) {
      Values.push(1);
      continue;
    }

    const NextValue = PreviousValue + SecondPreviousValue + ThirdPreviousValue;
    Values.push(NextValue);
    ThirdPreviousValue = SecondPreviousValue;
    SecondPreviousValue = PreviousValue;
    PreviousValue = NextValue;
  }

  return Values;
}

function BuildTribonacciPreview(TermCount: number): {
  PreviewValues: bigint[];
  FinalValue: bigint;
} {
  const PreviewValues: bigint[] = [];
  const PreviewCount = GetSequencePreviewCount(TermCount);
  let ThirdPreviousValue = 0n;
  let SecondPreviousValue = 0n;
  let PreviousValue = 1n;
  let FinalValue = 0n;

  for (let Index = 0; Index < TermCount; Index += 1) {
    if (Index === 0 || Index === 1) {
      FinalValue = 0n;
    } else if (Index === 2) {
      FinalValue = 1n;
    } else {
      const NextValue = PreviousValue + SecondPreviousValue + ThirdPreviousValue;
      FinalValue = NextValue;
      ThirdPreviousValue = SecondPreviousValue;
      SecondPreviousValue = PreviousValue;
      PreviousValue = NextValue;
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

export function BuildTribonacciRun(TermCount: number): SequenceRunModel {
  const PreviewCount = GetSequencePreviewCount(TermCount);
  const SequencePreview = BuildTribonacciPreview(TermCount);

  return BuildRecursiveSequenceRun({
    Values: SequencePreview.PreviewValues,
    NotationPrefix: "T",
    BaseCount: 3,
    Dependencies: [
      { Offset: 1, Tone: "near" },
      { Offset: 2, Tone: "mid" },
      { Offset: 3, Tone: "far" },
    ],
    Legend: [
      { Tone: "far", Label: "T(n−3) → T(n)" },
      { Tone: "mid", Label: "T(n−2) → T(n)" },
      { Tone: "near", Label: "T(n−1) → T(n)" },
    ],
    FinalLabel: "Final Value",
    FinalIndex: TermCount - 1,
    FinalValue: SequencePreview.FinalValue,
    FinalSequenceText: BuildSequenceSummaryText(
      SequencePreview.PreviewValues,
      SequencePreview.FinalValue,
      TermCount,
    ),
    FinalDetailText: BuildSequencePreviewDetail("T", PreviewCount, TermCount),
  });
}
