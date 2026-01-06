// src/sections/experience/experience.adapter.ts

import type { ExperienceModel } from "./experience.types";
import type { ExperienceDictionary } from "@/i18n/types/experience.types";

export function adaptExperienceFromI18n(
  dict: ExperienceDictionary
): ExperienceModel {
  return {
    title: dict.title,
    subtitle: dict.subtitle,
    description: dict.description,
    techStack: dict.techStack,
    items: dict.items,
  };
}
