import { useState, type FormEvent } from "react";

import type { TopicContent } from "~/content/topics/topic_types";
import { UseTopicRunner } from "~/hooks/use_topic_runner";
import {
  BuildTopicPresentation,
  GetInitialFieldValues,
} from "~/services/topics/topic_runtime";

import { SiteShell } from "~/components/layout/site_shell";
import { TopicDefinition } from "~/components/topic/topic_definition";
import { TopicDescription } from "~/components/topic/topic_description";
import { TopicForm } from "~/components/topic/topic_form";
import { TopicHeader } from "~/components/topic/topic_header";
import { ProcedureView } from "~/components/visualization/procedure_view";
import { SequenceView } from "~/components/visualization/sequence_view";
import type { TopicInputField } from "~/content/topics/topic_types";

type TopicPageProps = {
  Content: TopicContent;
};

function BuildConstraintText(Input: TopicInputField): string {
  if (Input.ConstraintText) {
    return `${Input.Label}: ${Input.ConstraintText}`;
  }

  if (typeof Input.Minimum === "number" && typeof Input.Maximum === "number") {
    return `${Input.Label}: ${Input.Minimum} to ${Input.Maximum}. ${Input.HelpText}`;
  }

  return `${Input.Label}: ${Input.HelpText}`;
}

export function TopicPage({ Content }: TopicPageProps) {
  const Runner = UseTopicRunner();
  const [FieldValues, SetFieldValues] = useState(() => GetInitialFieldValues(Content));
  const [ValidationMessage, SetValidationMessage] = useState("");

  function HandleFieldChange(FieldKey: string, NextValue: string) {
    SetFieldValues((CurrentValues) => ({
      ...CurrentValues,
      [FieldKey]: NextValue,
    }));
    SetValidationMessage("");
  }

  function HandleCompute(Event: FormEvent<HTMLFormElement>) {
    Event.preventDefault();

    const RuntimeResult = BuildTopicPresentation(Content, FieldValues);

    if (!RuntimeResult.IsValid) {
      SetValidationMessage(RuntimeResult.ErrorMessage);
      return;
    }

    SetValidationMessage("");
    Runner.StartRun(RuntimeResult.Presentation);
  }

  function HandleReset() {
    SetFieldValues(GetInitialFieldValues(Content));
    SetValidationMessage("");
    Runner.ResetRun();
  }

  return (
    <SiteShell>
      <div data-page={Content.Slug}>
        <TopicHeader
          BackLabel={Content.BackLabel}
          Description={Content.HeroDescription}
          Number={Content.Number}
          TitleParts={Content.TitleParts}
        />
        <section className="compute-section">
          <TopicDescription
            DescriptionCards={Content.DescriptionCards}
            DescriptionHtml={Content.DescriptionHtml}
          />
          <TopicDefinition
            Constraints={Content.Inputs.map(BuildConstraintText)}
            Definition={Content.Definition}
          />
          <TopicForm
            FieldValues={FieldValues}
            FormIdPrefix={Content.Slug}
            Inputs={Content.Inputs}
            IsAnimating={Runner.IsRunning}
            OnCompute={HandleCompute}
            OnFieldChange={HandleFieldChange}
            OnReset={HandleReset}
            ValidationMessage={ValidationMessage}
          />
          {Runner.RunModel?.Kind === "sequence" ? (
            <SequenceView
              ActiveSourceIndices={Runner.ActiveSourceIndices}
              ActiveSourceTone={Runner.ActiveSourceTone}
              AnimateDependencies={Runner.AnimateDependencies}
              CurrentStatus={Runner.CurrentStatus}
              OnSkip={Runner.SkipRun}
              RunModel={Runner.RunModel}
              ShowFinalValue={Runner.ShowFinalValue}
              ShowSkipButton={Runner.ShowSkipButton}
              VisibleDependencyIds={Runner.VisibleDependencyIds}
              VisibleSequenceIndices={Runner.VisibleSequenceIndices}
            />
          ) : null}
          {Runner.RunModel?.Kind === "procedure" ? (
            <ProcedureView
              CurrentStatus={Runner.CurrentStatus}
              OnSkip={Runner.SkipRun}
              RunModel={Runner.RunModel}
              ShowFinalValue={Runner.ShowFinalValue}
              ShowSkipButton={Runner.ShowSkipButton}
              VisibleProcedureStepCount={Runner.VisibleProcedureStepCount}
            />
          ) : null}
        </section>
      </div>
    </SiteShell>
  );
}
