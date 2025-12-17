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

type ThemeProviderProps = {
  children: React.ReactNode;
  initialTheme: Theme;
};

/**
 * ThemeProvider
 * - initialTheme приходить з SSR (cookies / middleware)
 * - client лише синхронізує DOM + cookies
 */
export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  /**
   * Apply theme:
   * - update state
   * - toggle `dark` class
   * - persist to cookies
   */
  const applyTheme = useCallback((nextTheme: Theme) => {
    setTheme(nextTheme);

    document.documentElement.classList.toggle("dark", nextTheme === "dark");

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
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setDark,
        setLight,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
