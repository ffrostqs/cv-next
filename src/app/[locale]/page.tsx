export const dynamic = "force-dynamic";

import { Hero } from "@/sections/hero/Hero";
import type { Locale } from "@/config/locales";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <Hero locale={locale} />;
}
