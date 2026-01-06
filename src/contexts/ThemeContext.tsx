"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const applyTheme = useCallback((nextTheme: Theme) => {
    setTheme(nextTheme);

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);

    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000`;
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme, applyTheme]);

  const setDark = useCallback(() => {
    applyTheme("dark");
  }, [applyTheme]);

  const setLight = useCallback(() => {
    applyTheme("light");
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setDark, setLight }}>
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
