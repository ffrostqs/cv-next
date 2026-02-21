import defaultTheme from "../../../themes/default/theme.json";

export type ThemeVariant = "light" | "dark";
export type ThemeTokens = Record<string, string>;

export type ThemeDefinition = {
  name: string;
  slug: string;
  modes: Record<ThemeVariant, ThemeTokens>;
};

export const THEMES: Record<string, ThemeDefinition> = {
  [defaultTheme.slug]: defaultTheme as ThemeDefinition,
};

export const DEFAULT_THEME_NAME = defaultTheme.slug;

export function getThemeDefinition(name?: string): ThemeDefinition {
  if (name && THEMES[name]) return THEMES[name];
  return THEMES[DEFAULT_THEME_NAME];
}

export function getThemeTokens(name: string, mode: ThemeVariant): ThemeTokens {
  const theme = getThemeDefinition(name);
  return theme.modes[mode] ?? theme.modes.light;
}
