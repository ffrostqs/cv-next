// src/sections/about/About.tsx

import { AboutClient } from "./About.client";
import { getDictionary } from "@/i18n";
import { adaptAbout } from "./about.adapter";
import type { AboutVariant } from "./about.types";
import type { Locale } from "@/config/locales";

export async function About({
  locale,
  variant,
}: {
  locale: Locale;
  variant: AboutVariant;
}) {
  const dict = await getDictionary(locale);
  const aboutData = dict.about?.[variant];

  if (!aboutData) return null;

  const about = adaptAbout(aboutData);

  return <AboutClient about={about} />;
}
