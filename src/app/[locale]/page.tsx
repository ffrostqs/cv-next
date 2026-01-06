import { redirect } from "next/navigation";
import { HomePage } from "@/sections/home/HomePage";
import { isLocale, DEFAULT_LOCALE } from "@/config/languages";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getDictionary } from "@/i18n";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ❌ невалідна локаль
  if (!isLocale(locale)) {
    redirect("/");
  }

  // ❌ ЗАБОРОНЯЄМО default locale в URL
  if (locale === DEFAULT_LOCALE) {
    redirect("/");
  }

  const dictionary = await getDictionary(locale);

  return (
    <LanguageProvider locale={locale} dictionary={dictionary}>
      <HomePage locale={locale} />
    </LanguageProvider>
  );
}
