import type { FinalValueModel, ProcedureRunModel, ProcedureStepModel } from "./types";

export function BuildProcedureRun(
  Steps: ProcedureStepModel[],
  FinalValue: FinalValueModel,
): ProcedureRunModel {
  return {
    Kind: "procedure",
    Steps,
    FinalValue,
  };
}
