import { prisma } from "@/lib/prisma";
import {
  DEFAULT_LOCALE,
  LANGUAGE_META,
  SUPPORTED_LOCALES,
} from "@/config/languages";

export type LocaleItem = {
  id: string;
  code: string;
  name: string;
  flag?: string | null;
  order: number;
  isDefault: boolean;
  isActive: boolean;
};

function fallbackLocales(): LocaleItem[] {
  return SUPPORTED_LOCALES.map((code, index) => ({
    id: code,
    code,
    name: LANGUAGE_META[code].label,
    flag: LANGUAGE_META[code].flag,
    order: index,
    isDefault: code === DEFAULT_LOCALE,
    isActive: true,
  }));
}

export async function getLocales(): Promise<LocaleItem[]> {
  const locales = await prisma.locale.findMany({
    where: { isActive: true },
    orderBy: [{ isDefault: "desc" }, { order: "asc" }],
  });

  const fallback = fallbackLocales();
  if (locales.length === 0) {
    return fallback;
  }

  const byCode = new Map(locales.map((locale) => [locale.code, locale]));
  const merged = [...locales];

  for (const item of fallback) {
    if (!byCode.has(item.code)) {
      merged.push(item);
    }
  }

  return merged.sort((a, b) => {
    if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
    return a.order - b.order;
  });
}

export async function getDefaultLocale(): Promise<LocaleItem | null> {
  const locale = await prisma.locale.findFirst({ where: { isDefault: true } });
  if (locale) return locale;

  const fallback = fallbackLocales().find((item) => item.isDefault);
  return fallback ?? null;
}

export async function getAllLocales(): Promise<LocaleItem[]> {
  const locales = await prisma.locale.findMany({
    orderBy: [{ isDefault: "desc" }, { order: "asc" }],
  });

  const fallback = fallbackLocales();
  if (locales.length === 0) {
    return fallback;
  }

  const byCode = new Map(locales.map((locale) => [locale.code, locale]));
  const merged = [...locales];

  for (const item of fallback) {
    if (!byCode.has(item.code)) {
      merged.push(item);
    }
  }

  return merged.sort((a, b) => {
    if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
    return a.order - b.order;
  });
}
