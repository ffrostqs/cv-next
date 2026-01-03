import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/config/locales";
import { adaptFooter } from "./footer.adapter";
import { FooterClient } from "./Footer.client";

export async function Footer({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const footer = adaptFooter(dict.footer);

  return <FooterClient footer={footer} />;
}
