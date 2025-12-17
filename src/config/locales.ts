export const locales = ["en", "de", "uk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Runtime type guard for locale
 */
export function isLocale(value: string | undefined): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}
