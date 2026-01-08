// src/sections/experience/Experience.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { adaptExperienceFromI18n } from "./experience.adapter";
import { ExperienceClient } from "./Experience.client";

export function Experience() {
  const { tn } = useLanguage();
  const experience = adaptExperienceFromI18n(tn("experience"));

  return <ExperienceClient experience={experience} />;
}
