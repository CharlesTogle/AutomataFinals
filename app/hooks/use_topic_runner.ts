import { useCallback, useEffect, useRef, useState } from "react";

import { SequenceTiming } from "~/global/constants";
import type { LegendTone, TopicRunModel } from "~/services/visualization/types";

type TimerHandle = ReturnType<typeof setTimeout>;

function AddUniqueNumbers(CurrentValues: number[], NextValues: number[]): number[] {
  const NextSet = new Set(CurrentValues);

  for (const Value of NextValues) {
    NextSet.add(Value);
  }

  return Array.from(NextSet).sort((LeftValue, RightValue) => LeftValue - RightValue);
}

function AddUniqueStrings(CurrentValues: string[], NextValues: string[]): string[] {
  const NextSet = new Set(CurrentValues);

  for (const Value of NextValues) {
    NextSet.add(Value);
  }

  return Array.from(NextSet);
}

export function UseTopicRunner() {
  const TimerHandlesRef = useRef<TimerHandle[]>([]);
  const [RunModel, SetRunModel] = useState<TopicRunModel | null>(null);
  const [CurrentStatus, SetCurrentStatus] = useState("");
  const [IsRunning, SetIsRunning] = useState(false);
  const [ShowSkipButton, SetShowSkipButton] = useState(false);
  const [ShowFinalValue, SetShowFinalValue] = useState(false);
  const [VisibleSequenceIndices, SetVisibleSequenceIndices] = useState<number[]>([]);
  const [VisibleDependencyIds, SetVisibleDependencyIds] = useState<string[]>([]);
  const [ActiveSourceIndices, SetActiveSourceIndices] = useState<number[]>([]);
  const [ActiveSourceTone, SetActiveSourceTone] = useState<LegendTone | null>(null);
  const [VisibleProcedureStepCount, SetVisibleProcedureStepCount] = useState(0);
  const [AnimateDependencies, SetAnimateDependencies] = useState(true);

  const ClearTimers = useCallback(() => {
    for (const TimerHandleValue of TimerHandlesRef.current) {
      clearTimeout(TimerHandleValue);
    }

    TimerHandlesRef.current = [];
  }, []);

  const RegisterTimer = useCallback((TimerHandleValue: TimerHandle) => {
    TimerHandlesRef.current.push(TimerHandleValue);
  }, []);

  const CompleteRun = useCallback(() => {
    SetCurrentStatus("");
    SetIsRunning(false);
    SetShowSkipButton(false);
    SetActiveSourceIndices([]);
    SetActiveSourceTone(null);
    SetShowFinalValue(true);
    SetAnimateDependencies(false);
  }, []);

  const ResetRun = useCallback(() => {
    ClearTimers();
    SetRunModel(null);
    SetCurrentStatus("");
    SetIsRunning(false);
    SetShowSkipButton(false);
    SetShowFinalValue(false);
    SetVisibleSequenceIndices([]);
    SetVisibleDependencyIds([]);
    SetActiveSourceIndices([]);
    SetActiveSourceTone(null);
    SetVisibleProcedureStepCount(0);
    SetAnimateDependencies(true);
  }, [ClearTimers]);

  const StartSequenceRun = useCallback(
    (NextRunModel: Extract<TopicRunModel, { Kind: "sequence" }>) => {
      const RunStep = (StepIndex: number) => {
        if (StepIndex >= NextRunModel.Steps.length) {
          CompleteRun();
          return;
        }

        const Step = NextRunModel.Steps[StepIndex];

        if (Step.IsBase) {
          SetCurrentStatus(Step.Status);
          SetVisibleSequenceIndices((CurrentValues) =>
            AddUniqueNumbers(CurrentValues, [Step.RevealIndex]),
          );
          SetActiveSourceIndices([]);
          SetActiveSourceTone(null);
          SetIsRunning(false);

          RegisterTimer(setTimeout(() => RunStep(StepIndex + 1), SequenceTiming.StepMs));
          return;
        }

        SetCurrentStatus(Step.Status);
        SetActiveSourceIndices(Step.SourceIndices);
        SetActiveSourceTone(Step.ActiveSourceTone ?? null);
        SetIsRunning(true);

        RegisterTimer(
          setTimeout(() => {
            SetVisibleSequenceIndices((CurrentValues) =>
              AddUniqueNumbers(CurrentValues, [Step.RevealIndex]),
            );
            SetVisibleDependencyIds((CurrentValues) =>
              AddUniqueStrings(CurrentValues, Step.DependencyIds),
            );
          }, SequenceTiming.RevealDelayMs),
        );

        RegisterTimer(
          setTimeout(() => {
            SetActiveSourceIndices([]);
            SetActiveSourceTone(null);
          }, SequenceTiming.StepMs - SequenceTiming.SourceClearLeadMs),
        );

        RegisterTimer(setTimeout(() => RunStep(StepIndex + 1), SequenceTiming.StepMs));
      };

      SetRunModel(NextRunModel);
      SetCurrentStatus("");
      SetIsRunning(false);
      SetShowSkipButton(true);
      SetShowFinalValue(false);
      SetVisibleSequenceIndices([]);
      SetVisibleDependencyIds([]);
      SetActiveSourceIndices([]);
      SetActiveSourceTone(null);
      SetVisibleProcedureStepCount(0);
      SetAnimateDependencies(true);
      RunStep(0);
    },
    [CompleteRun, RegisterTimer],
  );

  const StartProcedureRun = useCallback(
    (NextRunModel: Extract<TopicRunModel, { Kind: "procedure" }>) => {
      const RunStep = (StepIndex: number) => {
        if (StepIndex >= NextRunModel.Steps.length) {
          SetVisibleProcedureStepCount(NextRunModel.Steps.length);
          CompleteRun();
          return;
        }

        const Step = NextRunModel.Steps[StepIndex];
        SetVisibleProcedureStepCount(StepIndex + 1);
        SetCurrentStatus(Step.Title);
        SetIsRunning(true);

        RegisterTimer(setTimeout(() => RunStep(StepIndex + 1), 720));
      };

      SetRunModel(NextRunModel);
      SetCurrentStatus("");
      SetIsRunning(false);
      SetShowSkipButton(true);
      SetShowFinalValue(false);
      SetVisibleSequenceIndices([]);
      SetVisibleDependencyIds([]);
      SetActiveSourceIndices([]);
      SetActiveSourceTone(null);
      SetVisibleProcedureStepCount(0);
      SetAnimateDependencies(false);
      RunStep(0);
    },
    [CompleteRun, RegisterTimer],
  );

  const StartRun = useCallback(
    (NextRunModel: TopicRunModel) => {
      ClearTimers();

      if (NextRunModel.Kind === "sequence") {
        StartSequenceRun(NextRunModel);
        return;
      }

      StartProcedureRun(NextRunModel);
    },
    [ClearTimers, StartProcedureRun, StartSequenceRun],
  );

  const SkipRun = useCallback(() => {
    if (RunModel === null) {
      return;
    }

    ClearTimers();
    SetCurrentStatus("");
    SetIsRunning(false);
    SetShowSkipButton(false);
    SetShowFinalValue(true);
    SetActiveSourceIndices([]);
    SetActiveSourceTone(null);
    SetAnimateDependencies(false);

    if (RunModel.Kind === "sequence") {
      SetVisibleSequenceIndices(RunModel.Items.map((_, Index) => Index));
      SetVisibleDependencyIds(RunModel.Dependencies.map((Dependency) => Dependency.Id));
      return;
    }

    SetVisibleProcedureStepCount(RunModel.Steps.length);
  }, [ClearTimers, RunModel]);

  useEffect(() => ClearTimers, [ClearTimers]);

  return {
    RunModel,
    CurrentStatus,
    IsRunning,
    ShowSkipButton,
    ShowFinalValue,
    VisibleSequenceIndices,
    VisibleDependencyIds,
    ActiveSourceIndices,
    ActiveSourceTone,
    VisibleProcedureStepCount,
    AnimateDependencies,
    StartRun,
    SkipRun,
    ResetRun,
  };
}
