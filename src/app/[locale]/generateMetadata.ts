import type { Metadata } from "next";
import { isLocale, DEFAULT_LOCALE } from "@/config/languages";

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;

  const base = process.env.NEXT_PUBLIC_SITE_URL;

  const titles = {
    de: "Full-Stack Entwickler – Portfolio",
    en: "Full-Stack Developer – Portfolio",
  };

  const descriptions = {
    de: "Persönliches Portfolio eines Full-Stack Entwicklers.",
    en: "Personal portfolio of a full-stack developer.",
  };

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

    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: locale === DEFAULT_LOCALE ? base : `${base}/${locale}`,
      siteName: titles[locale],
      type: "website",
    },
  };
}
