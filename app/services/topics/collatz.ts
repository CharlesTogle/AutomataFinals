import { FormatNumber } from "../validation/numeric_input";
import { BuildChainSequenceRun } from "../visualization/sequence_steps";
import type { SequenceRunModel } from "../visualization/types";

export function BuildCollatzSequence(StartValue: number): number[] {
  const Values = [StartValue];
  let CurrentValue = StartValue;

  while (CurrentValue !== 1) {
    CurrentValue = CurrentValue % 2 === 0 ? CurrentValue / 2 : CurrentValue * 3 + 1;
    Values.push(CurrentValue);
  }

  return Values;
}

export function BuildCollatzRun(StartValue: number): SequenceRunModel {
  return BuildChainSequenceRun({
    Values: BuildCollatzSequence(StartValue),
    NotationPrefix: "C",
    Legend: [
      { Tone: "even", Label: "/2" },
      { Tone: "odd", Label: "3n + 1" },
    ],
    FinalLabel: "Termination Value",
    ToneBuilder: (PreviousValue) => (PreviousValue % 2 === 0 ? "even" : "odd"),
    StatusBuilder: (Value, PreviousValue, Index) =>
      PreviousValue % 2 === 0
        ? `C(${Index}) = ${FormatNumber(PreviousValue)} / 2 = ${FormatNumber(Value)}`
        : `C(${Index}) = 3 × ${FormatNumber(PreviousValue)} + 1 = ${FormatNumber(Value)}`,
  });
}
