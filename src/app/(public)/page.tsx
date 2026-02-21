import type { Locale } from "@/config/languages";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { adaptFooter } from "@/components/footer/footer.adapter";
import { HomePage } from "@/sections/home/HomePage";
import { getDictionary } from "@/i18n";
import { getDefaultLocale, getLocales } from "@/lib/locales";
import { getMenuItems } from "@/lib/menu";

export default async function RootPage() {
  const locales = await getLocales();
  const defaultLocale = await getDefaultLocale();
  const locale = (defaultLocale?.code ?? "de") as Locale;

  const dictionary = await getDictionary(locale);
  const footer = adaptFooter(dictionary.footer);
  const navItems = await getMenuItems(locale);

  return (
    <>
      <Header
        locale={locale}
        navItems={navItems}
        globalLabels={dictionary.global}
        locales={locales}
      />
      <HomePage dictionary={dictionary} />
      <Footer footer={footer} />
    </>
  );
}
