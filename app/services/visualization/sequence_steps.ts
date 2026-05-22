import { FormatNumber } from "../validation/numeric_input";
import type {
  FinalValueModel,
  LegendItem,
  LegendTone,
  SequenceDependencyModel,
  SequenceRunModel,
  SequenceStepModel,
} from "./types";

type IntegerValue = number | bigint;

type RecursiveDependency = {
  Offset: number;
  Tone: LegendTone;
};

type RecursiveSequenceOptions = {
  Values: IntegerValue[];
  NotationPrefix: string;
  BaseCount: number;
  Dependencies: RecursiveDependency[];
  Legend: LegendItem[];
  FinalLabel: string;
  FinalIndex?: number;
  FinalValue?: IntegerValue;
  FinalSequenceText?: string;
  FinalDetailText?: string;
};

type ChainSequenceOptions = {
  Values: number[];
  NotationPrefix: string;
  Legend: LegendItem[];
  FinalLabel: string;
  ToneBuilder: (PreviousValue: number, Index: number) => LegendTone;
  StatusBuilder: (Value: number, PreviousValue: number, Index: number) => string;
};

function BuildDependencyId(
  FromIndex: number,
  ToIndex: number,
  Tone: LegendTone,
): string {
  return `${Tone}-${FromIndex}-${ToIndex}`;
}

function BuildFinalValue(
  Label: string,
  Notation: string,
  FinalNumber: IntegerValue,
  Values: IntegerValue[],
  SequenceText?: string,
  DetailText?: string,
): FinalValueModel {
  return {
    Label,
    Notation,
    Number: FormatNumber(FinalNumber),
    SequenceText:
      SequenceText ?? Values.map((Value) => FormatNumber(Value)).join(", "),
    DetailText,
  };
}

export function BuildRecursiveSequenceRun(
  Options: RecursiveSequenceOptions,
): SequenceRunModel {
  const Items = Options.Values.map((Value, Index) => ({
    Notation: `${Options.NotationPrefix}(${Index})`,
    Value: FormatNumber(Value),
    IsBase: Index < Options.BaseCount,
  }));

  const Dependencies: SequenceDependencyModel[] = [];
  const Steps: SequenceStepModel[] = [];

  for (let Index = 0; Index < Options.Values.length; Index += 1) {
    if (Index < Options.BaseCount) {
      Steps.push({
        Index,
        RevealIndex: Index,
        Status: `${Options.NotationPrefix}(${Index}) = ${FormatNumber(Options.Values[Index])} — base case`,
        SourceIndices: [],
        DependencyIds: [],
        IsBase: true,
      });

      continue;
    }

    const SourceIndices: number[] = [];
    const DependencyIds: string[] = [];
    const NotationParts: string[] = [];
    const ValueParts: string[] = [];

    for (const Dependency of Options.Dependencies) {
      const SourceIndex = Index - Dependency.Offset;
      const DependencyId = BuildDependencyId(SourceIndex, Index, Dependency.Tone);

      SourceIndices.push(SourceIndex);
      DependencyIds.push(DependencyId);
      NotationParts.push(`${Options.NotationPrefix}(${SourceIndex})`);
      ValueParts.push(FormatNumber(Options.Values[SourceIndex]));
      Dependencies.push({
        Id: DependencyId,
        FromIndex: SourceIndex,
        ToIndex: Index,
        Tone: Dependency.Tone,
      });
    }

    Steps.push({
      Index,
      RevealIndex: Index,
      Status: `${Options.NotationPrefix}(${Index}) = ${NotationParts.join(" + ")} = ${ValueParts.join(" + ")} = ${FormatNumber(Options.Values[Index])}`,
      SourceIndices,
      DependencyIds,
      IsBase: false,
    });
  }

  const LastIndex = Math.max(Options.Values.length - 1, 0);
  const FinalIndex = Options.FinalIndex ?? LastIndex;
  const FinalValue = Options.FinalValue ?? Options.Values[LastIndex];

  return {
    Kind: "sequence",
    Legend: Options.Legend,
    Items,
    Dependencies,
    Steps,
    FinalValue: BuildFinalValue(
      Options.FinalLabel,
      `${Options.NotationPrefix}(${FormatNumber(FinalIndex)})`,
      FinalValue,
      Options.Values,
      Options.FinalSequenceText,
      Options.FinalDetailText,
    ),
  };
}

export function BuildChainSequenceRun(
  Options: ChainSequenceOptions,
): SequenceRunModel {
  const Items = Options.Values.map((Value, Index) => ({
    Notation: `${Options.NotationPrefix}(${Index})`,
    Value: FormatNumber(Value),
    IsBase: Index === 0,
  }));

  const Dependencies: SequenceDependencyModel[] = [];
  const Steps: SequenceStepModel[] = [];

  for (let Index = 0; Index < Options.Values.length; Index += 1) {
    if (Index === 0) {
      Steps.push({
        Index,
        RevealIndex: 0,
        Status: `${Options.NotationPrefix}(0) = ${FormatNumber(Options.Values[0])} — start value`,
        SourceIndices: [],
        DependencyIds: [],
        IsBase: true,
      });

      continue;
    }

    const DependencyTone = Options.ToneBuilder(Options.Values[Index - 1], Index);
    const DependencyId = BuildDependencyId(Index - 1, Index, DependencyTone);

    Dependencies.push({
      Id: DependencyId,
      FromIndex: Index - 1,
      ToIndex: Index,
      Tone: DependencyTone,
    });

    Steps.push({
      Index,
      RevealIndex: Index,
      Status: Options.StatusBuilder(Options.Values[Index], Options.Values[Index - 1], Index),
      SourceIndices: [Index - 1],
      DependencyIds: [DependencyId],
      ActiveSourceTone: DependencyTone,
      IsBase: false,
    });
  }

  const LastIndex = Math.max(Options.Values.length - 1, 0);

  return {
    Kind: "sequence",
    Legend: Options.Legend,
    Items,
    Dependencies,
    Steps,
    FinalValue: BuildFinalValue(
      Options.FinalLabel,
      `${Options.NotationPrefix}(${LastIndex})`,
      Options.Values[LastIndex],
      Options.Values,
    ),
  };
}
