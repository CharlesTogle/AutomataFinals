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
  const OriginalProduct = OriginalDividend * OriginalDivisor;
  const Steps: ProcedureStepModel[] = [
    {
      Id: "normalize",
      Label: "Step 1",
      Title: "Normalize the inputs",
      Body:
        "Start with one division step exactly like the division algorithm: the larger value is m and the smaller value is n.",
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
      Title: "Repeat the division algorithm",
      Body:
        "Compute m = nq + r, then let the previous divisor become the next dividend and the previous remainder become the next divisor.",
      Emphasis: `${FormatNumber(Dividend)} = ${FormatNumber(Divisor)}(${FormatNumber(Quotient)}) + ${FormatNumber(Remainder)}`,
    });

    Dividend = Divisor;
    Divisor = Remainder;
    StepNumber += 1;
  }

  const GreatestCommonDivisor = Dividend;
  const LeastCommonMultiple = OriginalProduct / GreatestCommonDivisor;

  Steps.push({
    Id: "result",
    Label: `Step ${StepNumber}`,
    Title: "Read the gcd and compute the lcm",
    Body:
      "When a step gives remainder 0, the previous non-zero remainder is the gcd. Multiply the original integers and divide by the gcd to get the lcm.",
    Emphasis:
      `gcd = ${FormatNumber(GreatestCommonDivisor)}, lcm = (${FormatNumber(OriginalDividend)} x ${FormatNumber(OriginalDivisor)}) / ${FormatNumber(GreatestCommonDivisor)} = ${FormatNumber(LeastCommonMultiple)}`,
  });

  return BuildProcedureRun(Steps, {
    Label: "Final Result",
    Notation: `gcd(${FormatNumber(OriginalDividend)}, ${FormatNumber(OriginalDivisor)})`,
    Number: FormatNumber(GreatestCommonDivisor),
    Blocks: [
      {
        Label: "GCD",
        Value: FormatNumber(GreatestCommonDivisor),
      },
      {
        Label: "LCM",
        Value: FormatNumber(LeastCommonMultiple),
      },
    ],
    DetailText:
      `lcm = (${FormatNumber(OriginalDividend)} x ${FormatNumber(OriginalDivisor)}) / ${FormatNumber(GreatestCommonDivisor)} = ${FormatNumber(LeastCommonMultiple)}`,
  });
}
