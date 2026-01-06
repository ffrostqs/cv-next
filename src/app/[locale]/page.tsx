// src/app/[locale]/page.tsx
import { notFound } from "next/navigation";
import { isLocale, DEFAULT_LOCALE } from "@/config/languages";
import { getDictionary } from "@/i18n";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { HomePage } from "@/sections/home/HomePage";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
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
