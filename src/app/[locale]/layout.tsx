// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import type { Locale } from "@/config/languages";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { getDictionary } from "@/i18n";
import { adaptFooter } from "@/components/footer/footer.adapter";
export { generateMetadata } from "./generateMetadata";
import { getLocales } from "@/lib/locales";
import { getMenuItems } from "@/lib/menu";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const locales = await getLocales();
  const activeLocale = locales.find((item) => item.code === locale);
  if (!activeLocale) notFound();

  const dictionary = await getDictionary(locale as Locale);
  const footer = adaptFooter(dictionary.footer);
  const navItems = await getMenuItems(locale);

  return (
    <>
      <Header
        locale={locale as Locale}
        navItems={navItems}
        globalLabels={dictionary.global}
        locales={locales}
      />
      {children}
      <Footer footer={footer} />
    </>
  );
}
