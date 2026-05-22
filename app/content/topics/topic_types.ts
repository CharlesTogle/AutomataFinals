export type TitlePart = {
  Text: string;
  IsEmphasized?: boolean;
};

export type TopicDescriptionCard = {
  Label: string;
  Value: string;
};

export type TopicDefinition = {
  IntroHtml: string;
  SeedHtml?: string;
  LabelHtml?: string;
  FormulaHtml: string;
  ConditionHtml?: string;
};

export type TopicInputField = {
  Key: string;
  Label: string;
  Placeholder: string;
  DefaultValue: string;
  InputType?: "number" | "text";
  InputMode?: "numeric" | "text";
  Minimum?: number;
  Maximum?: number;
  MaximumLength?: number;
  ConstraintText?: string;
  HelpText: string;
};

export type TopicLegendTone =
  | "far"
  | "mid"
  | "near"
  | "single"
  | "even"
  | "odd";

export type TopicLegendItem = {
  Tone: TopicLegendTone;
  Label: string;
};

export type TopicViewKind = "sequence" | "procedure";

export type TopicContent = {
  Slug: string;
  Path: string;
  Number: string;
  Tag: string;
  ViewKind: TopicViewKind;
  BackLabel: string;
  TitleParts: TitlePart[];
  HeroDescription: string;
  DescriptionHtml: string;
  DescriptionCards: TopicDescriptionCard[];
  Definition: TopicDefinition;
  Inputs: TopicInputField[];
  Legend: TopicLegendItem[];
  ResultLabel: string;
};

export type LandingCard = {
  Number: string;
  Tag: string;
  Name: string;
  Description: string;
  Preview: string;
  Path: string;
};
