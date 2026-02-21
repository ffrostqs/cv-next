import { notFound } from "next/navigation";
import type { Locale } from "@/config/languages";
import { HomePage } from "@/sections/home/HomePage";
import { getDictionary } from "@/i18n";
import { getLocales } from "@/lib/locales";

export const dynamicParams = true;

export async function generateStaticParams() {
  const locales = await getLocales();
  return locales.map((locale) => ({
    locale: locale.code,
  }));
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const locales = await getLocales();
  if (!locales.some((item) => item.code === locale)) notFound();

  const dictionary = await getDictionary(locale as Locale);

  return <HomePage dictionary={dictionary} />;
}
