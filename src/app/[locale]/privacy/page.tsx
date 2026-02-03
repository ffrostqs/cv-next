import { SUPPORTED_LOCALES, isLocale, type Locale } from "@/config/languages";
import { PrivacyClient } from "@/sections/legal/Privacy.client";
import { getDictionary } from "@/i18n";
import { notFound } from "next/navigation";
export const dynamic = "force-static";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);
  return <PrivacyClient dict={dictionary.privacy} />;
}
