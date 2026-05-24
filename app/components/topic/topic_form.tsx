import type { FormEvent } from "react";

import type { TopicInputField } from "~/content/topics/topic_types";
import type { TopicFieldValues } from "~/services/topics/topic_runtime";

import { TopicActions } from "./topic_actions";

type TopicFormProps = {
  Inputs: TopicInputField[];
  FieldValues: TopicFieldValues;
  ValidationMessage: string;
  IsAnimating: boolean;
  OnFieldChange: (FieldKey: string, NextValue: string) => void;
  OnCompute: (Event: FormEvent<HTMLFormElement>) => void;
  OnReset: () => void;
  FormIdPrefix: string;
};

export function TopicForm({
  Inputs,
  FieldValues,
  ValidationMessage,
  IsAnimating,
  OnFieldChange,
  OnCompute,
  OnReset,
  FormIdPrefix,
}: TopicFormProps) {
  return (
    <>
      <form
        className="compute-form anim-fade-up anim-delay-4"
        noValidate
        onReset={OnReset}
        onSubmit={OnCompute}
      >
        <div className="compute-form-fields">
          {Inputs.map((Input) => {
            const InputId = `${FormIdPrefix}-${Input.Key}`;
            const HelperId = `${InputId}-helper`;
            const InputType = Input.InputType ?? "number";
            const InputMode = Input.InputMode ?? (InputType === "number" ? "numeric" : "text");

            return (
              <div className="form-group" key={Input.Key}>
                <label className="form-label" htmlFor={InputId}>
                  {Input.Label}
                </label>
                <input
                  aria-describedby={HelperId}
                  autoCapitalize={InputType === "text" ? "none" : undefined}
                  className="input-field"
                  data-testid={`input-${Input.Key}`}
                  id={InputId}
                  inputMode={InputMode}
                  max={InputType === "number" ? Input.Maximum : undefined}
                  maxLength={InputType === "text" ? Input.MaximumLength : undefined}
                  min={InputType === "number" ? Input.Minimum : undefined}
                  minLength={InputType === "text" ? Input.MinimumLength : undefined}
                  onChange={(Event) => OnFieldChange(Input.Key, Event.target.value)}
                  placeholder={Input.Placeholder}
                  spellCheck={InputType === "text" ? false : undefined}
                  step={InputType === "number" ? 1 : undefined}
                  type={InputType}
                  value={FieldValues[Input.Key] ?? ""}
                />
                <p className="helper-text" id={HelperId}>
                  {Input.HelpText}
                </p>
              </div>
            );
          })}
        </div>
        <TopicActions IsAnimating={IsAnimating} />
      </form>
      <p
        aria-live="polite"
        className="validation-message"
        data-testid="validation-message"
      >
        {ValidationMessage}
      </p>
    </>
  );
}
