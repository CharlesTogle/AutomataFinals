import type { TopicDescriptionCard } from "~/content/topics/topic_types";

type TopicDescriptionProps = {
  DescriptionHtml: string;
  DescriptionCards: TopicDescriptionCard[];
};

export function TopicDescription({
  DescriptionHtml,
  DescriptionCards,
}: TopicDescriptionProps) {
  return (
    <>
      <section className="topic-copy anim-fade-up anim-delay-2">
        <p dangerouslySetInnerHTML={{ __html: DescriptionHtml }} />
      </section>
      <section className="detail-grid anim-fade-up anim-delay-3">
        {DescriptionCards.map((DescriptionCard) => (
          <article className="detail-card" key={DescriptionCard.Label}>
            <span className="detail-card-label">{DescriptionCard.Label}</span>
            <h2 className="detail-card-title">{DescriptionCard.Value}</h2>
          </article>
        ))}
      </section>
    </>
  );
}
