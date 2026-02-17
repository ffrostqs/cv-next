import type { Metadata } from "next";
import { getDefaultLocale, getLocales } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const locales = await getLocales();
  const defaultLocale = await getDefaultLocale();
  const locale =
    locales.find((item) => item.code === resolved.locale)?.code ??
    defaultLocale?.code ??
    "de";

  const base = process.env.NEXT_PUBLIC_SITE_URL;
  const title =
    locale === "de"
      ? "Full-Stack Entwickler – Portfolio"
      : "Full-Stack Developer – Portfolio";
  const description =
    locale === "de"
      ? "Persönliches Portfolio eines Full-Stack Entwicklers."
      : "Personal portfolio of a full-stack developer.";

  const defaultCode = defaultLocale?.code ?? "de";
  const url = base
    ? locale === defaultCode
      ? base
      : `${base}/${locale}`
    : undefined;

  const languageAlternates = base
    ? locales.reduce<Record<string, string>>((acc, item) => {
        acc[item.code] = item.code === defaultCode ? `${base}` : `${base}/${item.code}`;
        return acc;
      }, {})
    : undefined;

  return {
    title,
    description,

    alternates: base
      ? {
          canonical: url,
          languages: languageAlternates,
        }
      : undefined,

    openGraph: base
      ? {
          title,
          description,
          url,
          siteName: title,
          type: "website",
        }
      : undefined,
  };
}
