import type { Theme } from "@/contexts/ThemeContext";

export function getInitialTheme(cookieTheme?: string): Theme {
  if (cookieTheme === "light" || cookieTheme === "dark") {
    return cookieTheme;
  }

  // DEFAULT THEME
  return "dark";
}
