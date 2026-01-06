// src/app/[locale]/page.tsx
import { isLocale } from "@/config/languages";
import { getDictionary } from "@/i18n";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { HomePage } from "@/sections/home/HomePage";

const LOCALES = ["en", "de"] as const;

/**
 * REQUIRED for `output: "export"`
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // safety guard (build-time)
  if (!isLocale(locale)) {
    return null;
  }

  const dictionary = await getDictionary(locale);

  return (
    <LanguageProvider locale={locale} dictionary={dictionary}>
      <Header />
      <HomePage locale={locale} />
      <Footer />
    </LanguageProvider>
  );
}
