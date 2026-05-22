import type { ReactNode } from "react";

import { SiteFooter } from "./site_footer";
import { SiteHeader } from "./site_header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <div aria-hidden="true" className="page-bg" />
      <div className="page-wrapper">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
