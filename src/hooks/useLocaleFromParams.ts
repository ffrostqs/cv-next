"use client";

import { useParams } from "next/navigation";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/config/languages";

/**
 * Safely resolves locale from Next.js route params.
 * Always returns a valid Locale.
 */
export function useLocaleFromParams(): Locale {
  const params = useParams();

  const rawLocale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale;

  return isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
}
