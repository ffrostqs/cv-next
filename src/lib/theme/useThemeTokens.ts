"use client";

import { useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getThemeDefinition,
  getThemeTokens,
  type ThemeTokens,
  type ThemeVariant,
} from "./themes";

export function useThemeTokens(): {
  themeName: string;
  themeLabel: string;
  mode: "light" | "dark";
  tokens: ThemeTokens;
  setThemeName: (name: string) => void;
  setDark: () => void;
  setLight: () => void;
  toggleMode: () => void;
} {
  const { theme, themeName, setThemeName, setDark, setLight, toggleTheme } =
    useTheme();

  const definition = useMemo(
    () => getThemeDefinition(themeName),
    [themeName]
  );
  const tokens = useMemo(
    () => getThemeTokens(definition.slug, theme),
    [definition.slug, theme]
  );

  return {
    themeName: definition.slug,
    themeLabel: definition.name,
    mode: theme as ThemeVariant,
    tokens,
    setThemeName,
    setDark,
    setLight,
    toggleMode: toggleTheme,
  };
}
