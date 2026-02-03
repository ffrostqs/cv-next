import type { Metadata } from "next";
import { isLocale, DEFAULT_LOCALE } from "@/config/languages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const locale = isLocale(resolved.locale) ? resolved.locale : DEFAULT_LOCALE;

  const base = process.env.NEXT_PUBLIC_SITE_URL;

  const titles = {
    de: "Full-Stack Entwickler – Portfolio",
    en: "Full-Stack Developer – Portfolio",
  };

  const descriptions = {
    de: "Persönliches Portfolio eines Full-Stack Entwicklers.",
    en: "Personal portfolio of a full-stack developer.",
  };

  const url = base
    ? locale === DEFAULT_LOCALE
      ? base
      : `${base}/${locale}`
    : undefined;

  return {
    title: titles[locale],
    description: descriptions[locale],

    alternates: base
      ? {
          canonical:
            locale === DEFAULT_LOCALE ? `${base}` : `${base}/${locale}`,
          languages: {
            de: `${base}`,
            en: `${base}/en`,
          },
        }
      : undefined,

    openGraph: base
      ? {
          title: titles[locale],
          description: descriptions[locale],
          url,
          siteName: titles[locale],
          type: "website",
        }
      : undefined,
  };
}
