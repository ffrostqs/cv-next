import { HeroClient } from "./Hero.client";
import type { HeroModel } from "./hero.types";

export function Hero({ hero }: { hero: HeroModel }) {
  return <HeroClient hero={hero} />;
}
