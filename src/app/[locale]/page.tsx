// src/app/[locale]/page.tsx
import { notFound } from "next/navigation";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/config/languages";
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
    notFound();
  }

  return <HomePage />;
}
