export type LegendTone =
  | "far"
  | "mid"
  | "near"
  | "single"
  | "even"
  | "odd";

export type LegendItem = {
  Tone: LegendTone;
  Label: string;
};

export type FinalValueModel = {
  Label: string;
  Notation: string;
  Number: string;
  SequenceText?: string;
  DetailText?: string;
};

export type SequenceItemModel = {
  Notation: string;
  Value: string;
  IsBase: boolean;
};

export type SequenceDependencyModel = {
  Id: string;
  FromIndex: number;
  ToIndex: number;
  Tone: LegendTone;
};

export type SequenceStepModel = {
  Index: number;
  RevealIndex: number;
  Status: string;
  SourceIndices: number[];
  DependencyIds: string[];
  ActiveSourceTone?: LegendTone;
  IsBase: boolean;
};

export type SequenceRunModel = {
  Kind: "sequence";
  Legend: LegendItem[];
  Items: SequenceItemModel[];
  Dependencies: SequenceDependencyModel[];
  Steps: SequenceStepModel[];
  FinalValue: FinalValueModel;
};

export type ProcedureStepModel = {
  Id: string;
  Label: string;
  Title: string;
  Body: string;
  Emphasis?: string;
};

export type ProcedureRunModel = {
  Kind: "procedure";
  Steps: ProcedureStepModel[];
  FinalValue: FinalValueModel;
};

export type TopicRunModel = SequenceRunModel | ProcedureRunModel;
