"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { DEFAULT_THEME_NAME } from "@/lib/theme/themes";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  themeName: string;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
  setThemeName: (name: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "theme";
const THEME_NAME_STORAGE_KEY = "theme-name";

function getThemeFromStorage(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
}

function getThemeNameFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(THEME_NAME_STORAGE_KEY);
  return stored && stored.trim().length > 0 ? stored : null;
}

export function ThemeProvider({
  children,
  initialTheme,
  initialThemeName = DEFAULT_THEME_NAME,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
  initialThemeName?: string;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return initialTheme;
    }

    return getThemeFromStorage() ?? initialTheme;
  });
  const [themeName, setThemeNameState] = useState<string>(() => {
    if (typeof window === "undefined") {
      return initialThemeName;
    }

    return getThemeNameFromStorage() ?? initialThemeName;
  });

  // 🔑 sync DOM + cookie on change
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dataset.theme = themeName;
    root.dataset.themeMode = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.localStorage.setItem(THEME_NAME_STORAGE_KEY, themeName);
    } catch {}
  }, [theme, themeName]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setDark = useCallback(() => setTheme("dark"), []);
  const setLight = useCallback(() => setTheme("light"), []);
  const setThemeName = useCallback((name: string) => {
    setThemeNameState(name);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, themeName, toggleTheme, setDark, setLight, setThemeName }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
