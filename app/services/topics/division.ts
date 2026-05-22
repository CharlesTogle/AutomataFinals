import { FormatNumber } from "../validation/numeric_input";
import { BuildProcedureRun } from "../visualization/procedure_steps";
import type { ProcedureRunModel } from "../visualization/types";

export function BuildDivisionRun(
  FirstValue: number,
  SecondValue: number,
): ProcedureRunModel {
  const Dividend = Math.max(FirstValue, SecondValue);
  const Divisor = Math.min(FirstValue, SecondValue);
  const Quotient = Math.floor(Dividend / Divisor);
  const Remainder = Dividend % Divisor;
  const Equation = `${FormatNumber(Dividend)} = ${FormatNumber(Divisor)}(${FormatNumber(Quotient)}) + ${FormatNumber(Remainder)}`;

  return BuildProcedureRun(
    [
      {
        Id: "normalize",
        Label: "Step 1",
        Title: "Normalize the inputs",
        Body: `The larger value becomes the dividend and the smaller value becomes the divisor.`,
        Emphasis: `Dividend = ${FormatNumber(Dividend)}, divisor = ${FormatNumber(Divisor)}`,
      },
      {
        Id: "quotient",
        Label: "Step 2",
        Title: "Compute the quotient",
        Body: `Take the floor of dividend divided by divisor.`,
        Emphasis: `${FormatNumber(Dividend)} / ${FormatNumber(Divisor)} → ${FormatNumber(Quotient)}`,
      },
      {
        Id: "remainder",
        Label: "Step 3",
        Title: "Compute the remainder",
        Body: `Use the modulo operation to capture what is left over.`,
        Emphasis: `${FormatNumber(Dividend)} mod ${FormatNumber(Divisor)} = ${FormatNumber(Remainder)}`,
      },
      {
        Id: "equation",
        Label: "Step 4",
        Title: "Assemble the final equation",
        Body: `Substitute the computed quotient and remainder into m = nq + r.`,
        Emphasis: Equation,
      },
    ],
    {
      Label: "Final Equation",
      Notation: "m = nq + r",
      Number: Equation,
      DetailText: `q = ${FormatNumber(Quotient)}, r = ${FormatNumber(Remainder)}`,
    },
  );
}
