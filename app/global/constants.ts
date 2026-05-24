export const ThemeStorageKey = "nseq-theme";

export const DefaultTheme = "dark" as const;

export const FooterAttribution = {
  ProjectTitle: "FINAL PROJECT - Automata Theory and Formal Languages",
  Copyright: "Copyright 2026",
  Authors: [
    "Stefanie Gabion",
    "Joaquin Luis Guevarra",
    "Alexa Joanne Paula San Jose",
    "Charles Nathaniel Togle",
  ],
} as const;

export const TopicInputLimits = {
  SequenceTermsMin: 1,
  SequenceTermsMax: 100_000,
  PositiveIntegerMin: 1,
  PositiveIntegerMax: 999_999,
  PalindromeCandidateMax: 999_999_999,
  PalindromeCandidateMaxLength: 1_000,
  DivisionOperandMax: 999_999,
  EuclideanOperandMax: 999_999,
  CollatzStartMax: 999_999,
} as const;

export const SequenceDisplayLimits = {
  PreviewTermCount: 100,
  SummaryLeadCount: 8,
} as const;

export const SequenceTiming = {
  StepMs: 900,
  RevealDelayMs: 220,
  ArcDrawMs: 450,
  SourceClearLeadMs: 200,
} as const;
