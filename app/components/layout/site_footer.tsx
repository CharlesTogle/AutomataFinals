import { FooterAttribution } from "~/global/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-heading">{FooterAttribution.ProjectTitle}</p>
      <div className="footer-copy">
        <span className="footer-text">{FooterAttribution.Copyright}</span>
        {FooterAttribution.Authors.map((Author) => (
          <span className="footer-text" key={Author}>
            {Author}
          </span>
        ))}
      </div>
    </footer>
  );
}
