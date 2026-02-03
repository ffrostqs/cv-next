// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/config/languages";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { getDictionary } from "@/i18n";
import { adaptFooter } from "@/components/footer/footer.adapter";
export { generateMetadata } from "./generateMetadata";

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
  const footer = adaptFooter(dictionary.footer);

  return (
    <>
      <Header
        locale={locale as Locale}
        navLabels={dictionary.nav}
        globalLabels={dictionary.global}
      />
      {children}
      <Footer footer={footer} />
    </>
  );
}
