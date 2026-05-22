import { FormatNumber } from "../validation/numeric_input";
import { BuildProcedureRun } from "../visualization/procedure_steps";
import type { ProcedureRunModel, ProcedureStepModel } from "../visualization/types";

export function BuildEuclideanRun(
  FirstValue: number,
  SecondValue: number,
): ProcedureRunModel {
  let Dividend = Math.max(FirstValue, SecondValue);
  let Divisor = Math.min(FirstValue, SecondValue);
  const OriginalDividend = Dividend;
  const OriginalDivisor = Divisor;
  const Steps: ProcedureStepModel[] = [
    {
      Id: "normalize",
      Label: "Step 1",
      Title: "Normalize the inputs",
      Body: "The larger value starts as m and the smaller value starts as n.",
      Emphasis: `m = ${FormatNumber(Dividend)}, n = ${FormatNumber(Divisor)}`,
    },
  ];

  let StepNumber = 2;

  while (Divisor !== 0) {
    const Quotient = Math.floor(Dividend / Divisor);
    const Remainder = Dividend % Divisor;

    Steps.push({
      Id: `loop-${StepNumber}`,
      Label: `Step ${StepNumber}`,
      Title: "Apply one Euclidean division",
      Body: "Divide the current m by n, then replace the pair with (n, r).",
      Emphasis: `${FormatNumber(Dividend)} = ${FormatNumber(Divisor)}(${FormatNumber(Quotient)}) + ${FormatNumber(Remainder)}`,
    });

    Dividend = Divisor;
    Divisor = Remainder;
    StepNumber += 1;
  }

  const GreatestCommonDivisor = Dividend;
  const LeastCommonMultiple =
    (OriginalDividend * OriginalDivisor) / GreatestCommonDivisor;

  Steps.push({
    Id: "result",
    Label: `Step ${StepNumber}`,
    Title: "Read the final values",
    Body: "The last non-zero divisor is the gcd, and the lcm follows from the product divided by the gcd.",
    Emphasis: `gcd = ${FormatNumber(GreatestCommonDivisor)}, lcm = ${FormatNumber(LeastCommonMultiple)}`,
  });

  return BuildProcedureRun(Steps, {
    Label: "Final Result",
    Notation: `gcd(${FormatNumber(OriginalDividend)}, ${FormatNumber(OriginalDivisor)})`,
    Number: FormatNumber(GreatestCommonDivisor),
    DetailText: `lcm = ${FormatNumber(LeastCommonMultiple)}`,
  });
}
