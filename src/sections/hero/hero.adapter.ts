import { HeroDictionary } from "@/i18n/types";

export interface HeroModel {
  greeting: string;
  name: string;
  title: string;
  description: string;
  contact: string;
  resume: string;
  location: string;
  badge: {
    available: string;
    remote: string;
  };
  getInTouch: string;
}

export function adaptHeroFromI18n(hero: HeroDictionary): HeroModel {
  return {
    greeting: hero.greeting,
    name: hero.name,
    title: hero.title,
    description: hero.description,
    contact: hero.contact,
    resume: hero.resume,
    location: hero.location,
    badge: {
      available: hero.available,
      remote: hero.remote,
    },
    getInTouch: hero.getInTouch,
  };
}
