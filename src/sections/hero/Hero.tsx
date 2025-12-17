import { HeroClient } from "./Hero.client";
import { adaptHeroFromI18n } from "./hero.adapter";
import { getDictionary } from "@/i18n/getDictionary";

export async function Hero({ locale }: { locale: string }) {
  const dict = await getDictionary(locale);
  const hero = adaptHeroFromI18n(dict.hero);

  return <HeroClient hero={hero} />;
}
