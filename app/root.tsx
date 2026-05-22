import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./global/globals.css";
import { ThemeBootstrapScript } from "./global/theme";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Sora:wght@400;500&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      data-app-ready="false"
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: ThemeBootstrapScript }} />
        <Meta />
        <Links />
      </head>
      <body className="bg-[var(--clr-bg)] text-[var(--clr-text)] antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-app-ready", "true");
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-4xl text-[var(--clr-text)]">{message}</h1>
      <p className="max-w-[60ch] text-[var(--clr-text-muted)]">{details}</p>
      {stack && (
        <pre className="overflow-x-auto rounded-[var(--radius)] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 text-sm text-[var(--clr-lavender)]">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
