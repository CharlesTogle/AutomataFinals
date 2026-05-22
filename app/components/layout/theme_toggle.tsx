import { useState } from "react";

import { DefaultTheme, ThemeStorageKey } from "~/global/constants";
import {
  GetNextTheme,
  GetThemeToggleIcon,
  GetThemeToggleLabel,
  ResolveTheme,
  type ThemeName,
} from "~/global/theme";

function ReadDocumentTheme(): ThemeName {
  if (typeof document === "undefined") {
    return DefaultTheme;
  }

  return ResolveTheme(document.documentElement.getAttribute("data-theme"));
}

export function ThemeToggle() {
  const [Theme, SetTheme] = useState<ThemeName>(ReadDocumentTheme);

  function HandleToggle() {
    const HtmlElement = document.documentElement;
    const NextTheme = GetNextTheme(ReadDocumentTheme());

    HtmlElement.classList.add("theme-transitioning");
    HtmlElement.setAttribute("data-theme", NextTheme);
    localStorage.setItem(ThemeStorageKey, NextTheme);
    SetTheme(NextTheme);

    window.setTimeout(() => {
      HtmlElement.classList.remove("theme-transitioning");
    }, 350);
  }

  return (
    <button
      aria-label={GetThemeToggleLabel(Theme)}
      className="theme-toggle"
      data-testid="theme-toggle"
      onClick={HandleToggle}
      type="button"
    >
      <span className="toggle-icon" suppressHydrationWarning>
        {GetThemeToggleIcon(Theme)}
      </span>
    </button>
  );
}
