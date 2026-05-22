import { ThemeToggle } from "./theme_toggle";

export function SiteHeader() {
  return (
    <header className="site-header anim-fade-up">
      <span className="badge">AUTOMATA - Automata Theory and Formal Languages</span>
      <span className="badge">Final Project</span>
      <ThemeToggle />
    </header>
  );
}
