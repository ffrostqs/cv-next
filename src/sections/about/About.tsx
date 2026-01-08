// src/sections/about/About.tsx
"use client";

import { AboutClient } from "./About.client";
import { adaptAbout } from "./about.adapter";
import type { AboutVariant } from "./about.types";
import { useLanguage } from "@/contexts/LanguageContext";

export function About({ variant }: { variant: AboutVariant }) {
  const { tn } = useLanguage();

  const aboutData = tn("about")?.[variant];
  if (!aboutData) return null;

  const about = adaptAbout(aboutData);

  return <AboutClient about={about} />;
}
