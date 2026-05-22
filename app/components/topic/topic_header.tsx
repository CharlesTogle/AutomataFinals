import { Fragment } from "react";

import type { TitlePart } from "~/content/topics/topic_types";

import { BackButton } from "~/components/layout/back_button";

type TopicHeaderProps = {
  BackLabel: string;
  Number: string;
  Tag: string;
  TitleParts: TitlePart[];
  Description: string;
};

function RenderTitleParts(TitleParts: TitlePart[]) {
  return TitleParts.map((TitlePart, Index) => {
    const Key = `${TitlePart.Text}-${Index}`;
    const Content = TitlePart.IsEmphasized ? (
      <em>{TitlePart.Text}</em>
    ) : (
      <span>{TitlePart.Text}</span>
    );

    return (
      <Fragment key={Key}>
        {Content}
        {Index < TitleParts.length - 1 ? " " : null}
      </Fragment>
    );
  });
}

export function TopicHeader({
  BackLabel,
  Number,
  Tag,
  TitleParts,
  Description,
}: TopicHeaderProps) {
  return (
    <section className="page-hero anim-fade-up anim-delay-1">
      <BackButton Label={BackLabel} />
      <p className="page-hero-tag">
        {Number} - {Tag}
      </p>
      <h1 className="page-hero-title">{RenderTitleParts(TitleParts)}</h1>
      <p className="page-hero-desc">{Description}</p>
    </section>
  );
}
