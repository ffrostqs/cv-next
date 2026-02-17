import type { Locale } from "@/config/languages";
import { PrivacyClient } from "@/sections/legal/Privacy.client";
import { getDictionary } from "@/i18n";
import { notFound } from "next/navigation";
import { getLocales } from "@/lib/locales";
export const dynamic = "force-static";

export function generateStaticParams() {
  return getLocales().then((locales) =>
    locales.map((locale) => ({ locale: locale.code }))
  );
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const locales = await getLocales();
  if (!locales.some((item) => item.code === locale)) notFound();
  const dictionary = await getDictionary(locale as Locale);
  return <PrivacyClient dict={dictionary.privacy} />;
}
