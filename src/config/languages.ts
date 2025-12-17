import type { Locale } from "./locales";

export const LANGUAGE_META: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  uk: { label: "Українська", flag: "🇺🇦" },
};
