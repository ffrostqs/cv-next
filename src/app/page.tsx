import { HomePage } from "@/sections/home/HomePage";
import { DEFAULT_LOCALE } from "@/config/languages";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getDictionary } from "@/i18n";

export default async function RootPage() {
  const locale = DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);

  return (
    <LanguageProvider locale={locale} dictionary={dictionary}>
      <HomePage locale={locale} />
    </LanguageProvider>
  );
}
