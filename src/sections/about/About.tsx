import { AboutClient } from "./About.client";
import type { AboutModel } from "./about.types";

export function About({ about }: { about: AboutModel }) {
  if (!about) return null;
  return <AboutClient about={about} />;
}
