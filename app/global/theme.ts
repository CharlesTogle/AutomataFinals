import { DefaultTheme, ThemeStorageKey } from "./constants";

export type ThemeName = "dark" | "light";

const ThemeListeners = new Set<() => void>();

export function IsThemeName(value: string | null | undefined): value is ThemeName {
  return value === "dark" || value === "light";
}

export function ResolveTheme(value: string | null | undefined): ThemeName {
  return IsThemeName(value) ? value : DefaultTheme;
}

export function GetNextTheme(theme: ThemeName): ThemeName {
  return theme === "dark" ? "light" : "dark";
}

export function GetThemeToggleIcon(theme: ThemeName): string {
  return theme === "dark" ? "☀" : "☾";
}

export function GetThemeToggleLabel(theme: ThemeName): string {
  return theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

export function GetThemeSnapshot(): ThemeName {
  if (typeof document === "undefined") {
    return DefaultTheme;
  }

  return ResolveTheme(document.documentElement.getAttribute("data-theme"));
}

export function SubscribeTheme(listener: () => void): () => void {
  ThemeListeners.add(listener);

  return () => {
    ThemeListeners.delete(listener);
  };
}

export function SetTheme(theme: ThemeName): void {
  if (typeof document === "undefined") {
    return;
  }

  const documentElement = document.documentElement;
  documentElement.classList.add("theme-transitioning");
  documentElement.setAttribute("data-theme", theme);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ThemeStorageKey, theme);
    window.setTimeout(() => {
      documentElement.classList.remove("theme-transitioning");
    }, 350);
  }

  ThemeListeners.forEach((listener) => listener());
}

export function ToggleTheme(): void {
  SetTheme(GetNextTheme(GetThemeSnapshot()));
}

export const ThemeBootstrapScript = `(function(){var key="${ThemeStorageKey}";var theme=localStorage.getItem(key);if(theme==="dark"||theme==="light"){document.documentElement.setAttribute("data-theme",theme)}})();`;
