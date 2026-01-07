"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_COOKIE = "theme";

function getThemeFromCookie(): Theme | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(^| )${THEME_COOKIE}=([^;]+)`)
  );

  return match?.[2] === "dark" || match?.[2] === "light"
    ? (match[2] as Theme)
    : null;
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return initialTheme;
    }

    return getThemeFromCookie() ?? initialTheme;
  });

  // 🔑 sync DOM + cookie on change
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000`;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setDark = useCallback(() => setTheme("dark"), []);
  const setLight = useCallback(() => setTheme("light"), []);

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
