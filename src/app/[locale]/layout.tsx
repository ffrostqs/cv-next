// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/config/languages";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { getDictionary } from "@/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return (
    <LanguageProvider locale={locale as Locale} dictionary={dictionary}>
      <Header />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
