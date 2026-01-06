// src/app/page.tsx
import { DEFAULT_LOCALE } from "@/config/languages";
import { getDictionary } from "@/i18n";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { HomePage } from "@/sections/home/HomePage";

export default async function RootPage() {
  const locale = DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);

  return (
    <LanguageProvider locale={locale} dictionary={dictionary}>
      <Header />
      <HomePage locale={locale} />
      <Footer />
    </LanguageProvider>
  );
}
