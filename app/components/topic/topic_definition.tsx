import type { TopicDefinition as TopicDefinitionContent } from "~/content/topics/topic_types";

type TopicDefinitionProps = {
  Definition: TopicDefinitionContent;
  Constraints: string[];
};

export function TopicDefinition({
  Definition,
  Constraints,
}: TopicDefinitionProps) {
  return (
    <section className="definition-card anim-fade-up anim-delay-3">
      <p
        className="definition-intro"
        dangerouslySetInnerHTML={{ __html: Definition.IntroHtml }}
      />
      {Definition.SeedHtml ? (
        <p
          className="definition-formula"
          dangerouslySetInnerHTML={{ __html: Definition.SeedHtml }}
        />
      ) : null}
      {Definition.LabelHtml ? (
        <p
          className="definition-label"
          dangerouslySetInnerHTML={{ __html: Definition.LabelHtml }}
        />
      ) : null}
      <p
        className="definition-formula"
        dangerouslySetInnerHTML={{ __html: Definition.FormulaHtml }}
      />
      {Definition.ConditionHtml ? (
        <p
          className="definition-condition"
          dangerouslySetInnerHTML={{ __html: Definition.ConditionHtml }}
        />
      ) : null}
      <ul className="constraint-list">
        {Constraints.map((Constraint) => (
          <li className="constraint-item" key={Constraint}>
            {Constraint}
          </li>
        ))}
      </ul>
    </section>
  );
}
