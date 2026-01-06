// src/config/languages.ts

export const LANGUAGE_META = {
  de: { label: "Deutsch", flag: "🇩🇪" },
  en: { label: "English", flag: "🇺🇸" },
  // uk: { label: "Українська", flag: "🇺🇦" },
} as const;

export type Locale = keyof typeof LANGUAGE_META;

export const SUPPORTED_LOCALES = Object.keys(LANGUAGE_META) as Locale[];

export const DEFAULT_LOCALE: Locale = "de";

/**
 * Runtime type guard
 */
export function isLocale(value: string | undefined): value is Locale {
  return (
    typeof value === "string" && SUPPORTED_LOCALES.includes(value as Locale)
  );
}
