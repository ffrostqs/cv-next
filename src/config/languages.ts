export const LANGUAGE_META = {
  de: { label: "Deutsch", flag: "🇩🇪" },
  en: { label: "English", flag: "🇺🇸" },
} as const;

export type Locale = keyof typeof LANGUAGE_META;

export const SUPPORTED_LOCALES = Object.keys(
  LANGUAGE_META
) as readonly Locale[];

export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value?: string): value is Locale {
  return (
    typeof value === "string" &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}
