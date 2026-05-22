import { SequenceDisplayLimits } from "~/global/constants";

import { FormatNumber } from "../validation/numeric_input";

export function GetSequencePreviewCount(TermCount: number): number {
  return Math.min(TermCount, SequenceDisplayLimits.PreviewTermCount);
}

export function BuildSequenceSummaryText(
  PreviewValues: Array<number | bigint>,
  FinalValue: number | bigint,
  TermCount: number,
): string {
  if (TermCount <= SequenceDisplayLimits.PreviewTermCount) {
    return PreviewValues.map((Value) => FormatNumber(Value)).join(", ");
  }

  const LeadValues = PreviewValues
    .slice(0, SequenceDisplayLimits.SummaryLeadCount)
    .map((Value) => FormatNumber(Value))
    .join(", ");

  return `${LeadValues}, ... , ${FormatNumber(FinalValue)}`;
}

export function BuildSequencePreviewDetail(
  NotationPrefix: string,
  PreviewCount: number,
  TermCount: number,
): string | undefined {
  if (TermCount <= PreviewCount) {
    return undefined;
  }

  return `Animated preview shows the first ${FormatNumber(PreviewCount)} terms. Final value computed at ${NotationPrefix}(${FormatNumber(TermCount - 1)}).`;
}
