import { FooterAttribution } from "~/global/constants";
import type { SiteReference } from "~/content/topics/scholarly_references";

type SiteFooterProps = {
  References?: readonly SiteReference[];
};

export function SiteFooter({ References = [] }: SiteFooterProps) {
  return (
    <footer
      className="site-footer"
      data-has-references={References.length > 0 ? "true" : "false"}
    >
      <p className="footer-heading">{FooterAttribution.ProjectTitle}</p>
      <div className="footer-copy">
        <span className="footer-text">{FooterAttribution.Copyright}</span>
        {FooterAttribution.Authors.map((Author) => (
          <span className="footer-text" key={Author}>
            {Author}
          </span>
        ))}
      </div>
      {References.length > 0 ? (
        <section className="footer-references" aria-label="References">
          <p className="footer-heading">References</p>
          <ol className="footer-reference-list">
            {References.map((Reference) => (
              <li className="footer-reference-item" key={Reference.Key}>
                {Reference.ApaText}
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </footer>
  );
}
