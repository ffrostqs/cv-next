"use client";

import { HeroClient } from "./Hero.client";
import { adaptHeroFromI18n } from "./hero.adapter";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { tn } = useLanguage();
  const hero = adaptHeroFromI18n(tn("hero"));

  return <HeroClient hero={hero} />;
}
