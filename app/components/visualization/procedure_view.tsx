import type {
  ProcedureCopyPartModel,
  ProcedureRunModel,
} from "~/services/visualization/types";

import { SkipButton } from "./skip_button";

type ProcedureViewProps = {
  RunModel: ProcedureRunModel;
  CurrentStatus: string;
  ShowSkipButton: boolean;
  ShowFinalValue: boolean;
  VisibleProcedureStepCount: number;
  OnSkip: () => void;
};

function RenderProcedureCopy(
  Body: string,
  BodyParts?: ProcedureCopyPartModel[],
) {
  if (!BodyParts || BodyParts.length === 0) {
    return Body;
  }

  return BodyParts.map((Part, Index) => (
    <span
      className={Part.Tone === "focus" ? "procedure-step-copy-focus" : undefined}
      key={`${Part.Text}-${Index}`}
    >
      {Part.Text}
    </span>
  ));
}

export function ProcedureView({
  RunModel,
  CurrentStatus,
  ShowSkipButton,
  ShowFinalValue,
  VisibleProcedureStepCount,
  OnSkip,
}: ProcedureViewProps) {
  const VisibleSteps = RunModel.Steps.slice(0, VisibleProcedureStepCount);
  const ActiveStepIndex = Math.max(VisibleProcedureStepCount - 1, 0);
  const FinalBlocks = RunModel.FinalValue.Blocks ?? [
    {
      Label: RunModel.FinalValue.Notation,
      Value: RunModel.FinalValue.Number,
    },
  ];

  return (
    <section className="viz-wrapper anim-fade-up anim-delay-5" data-testid="procedure-view">
      <p className={`viz-status${ShowSkipButton ? " is-computing" : ""}`}>
        {CurrentStatus}
      </p>
      <div className="procedure-view">
        <div className="procedure-steps">
          {VisibleSteps.map((Step, Index) => {
            const StepClasses = [
              "procedure-step",
              Index === ActiveStepIndex && ShowSkipButton ? "is-active" : "",
              Index < ActiveStepIndex ? "is-dimmed" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article className={StepClasses} key={Step.Id}>
                <div className="procedure-step-header">
                  <span className="procedure-step-label">{Step.Label}</span>
                  <span className="procedure-step-value">{Step.Title}</span>
                </div>
                <p className="procedure-step-copy">
                  {RenderProcedureCopy(Step.Body, Step.BodyParts)}
                </p>
                {Step.Emphasis ? (
                  <p className="procedure-step-equation">{Step.Emphasis}</p>
                ) : null}
              </article>
            );
          })}
        </div>
        <SkipButton IsVisible={ShowSkipButton} OnSkip={OnSkip} />
        {ShowFinalValue ? (
          <div className="procedure-final" data-testid="procedure-final-value">
            <p className="procedure-final-title">{RunModel.FinalValue.Label}</p>
            <div className="procedure-final-blocks">
              {FinalBlocks.map((Block) => (
                <div className="detail-card procedure-final-card" key={Block.Label}>
                  <span className="detail-card-label">{Block.Label}</span>
                  <p className="procedure-final-value">{Block.Value}</p>
                </div>
              ))}
            </div>
            {RunModel.FinalValue.DetailText ? (
              <div className="detail-card procedure-final-detail">
                <span className="detail-card-label">Details</span>
                <p className="procedure-step-copy">{RunModel.FinalValue.DetailText}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
