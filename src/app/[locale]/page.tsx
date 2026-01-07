import { isLocale, SUPPORTED_LOCALES } from "@/config/languages";
import { getDictionary } from "@/i18n";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { HomePage } from "@/sections/home/HomePage";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
