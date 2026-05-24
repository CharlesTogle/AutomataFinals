import { Fragment } from "react";
import { Link } from "react-router";

import { LandingCards, LandingHero } from "~/content/topics/landing";
import { LandingReferences } from "~/content/topics/scholarly_references";

import { SiteShell } from "~/components/layout/site_shell";

function RenderLandingTitle() {
  return LandingHero.TitleParts.map((TitlePart, Index) => {
    const Key = `${TitlePart.Text}-${Index}`;
    const Content = TitlePart.IsEmphasized ? (
      <em>{TitlePart.Text}</em>
    ) : (
      <span>{TitlePart.Text}</span>
    );

    return (
      <Fragment key={Key}>
        {Content}
        {Index < LandingHero.TitleParts.length - 1 ? " " : null}
      </Fragment>
    );
  });
}

export function LandingPage() {
  return (
    <SiteShell FooterReferences={LandingReferences}>
      <section className="hero">
        <p className="hero-label anim-fade-up anim-delay-1">{LandingHero.Label}</p>
        <h1 className="hero-title anim-fade-up anim-delay-2">{RenderLandingTitle()}</h1>
        <hr className="hero-rule anim-fade-up anim-delay-3" />
        <p className="hero-desc anim-fade-up anim-delay-3">{LandingHero.Description}</p>
      </section>
      <section className="sequence-grid-section">
        <p className="section-label anim-fade-up anim-delay-4">Seven Topics</p>
        <div className="sequence-grid">
          {LandingCards.map((LandingCard, Index) => (
            <Link
              className={`seq-card anim-fade-up anim-delay-${Math.min(Index + 4, 6)}`}
              data-testid={`landing-card-${LandingCard.Name.toLowerCase().replaceAll(" ", "-")}`}
              key={LandingCard.Path}
              to={LandingCard.Path}
            >
              <div className="seq-card-head">
                <span className="seq-number">{LandingCard.Number}</span>
              </div>
              <h2 className="seq-name">{LandingCard.Name}</h2>
              <p className="seq-desc">{LandingCard.Description}</p>
              <p className="seq-preview">{LandingCard.Preview}</p>
              <span className="seq-arrow">Explore &rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
