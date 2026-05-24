import type { ReactNode } from "react";
import type { SiteReference } from "~/content/topics/scholarly_references";

import { SiteFooter } from "./site_footer";
import { SiteHeader } from "./site_header";

type SiteShellProps = {
  children: ReactNode;
  FooterReferences?: readonly SiteReference[];
};

export function SiteShell({ children, FooterReferences }: SiteShellProps) {
  return (
    <>
      <div aria-hidden="true" className="page-bg" />
      <div className="page-wrapper">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter References={FooterReferences} />
      </div>
    </>
  );
}
