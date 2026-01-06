// src/sections/experience/experience.adapter.ts

import type { ExperienceModel } from "./experience.types";
import type { ExperienceDictionary } from "@/i18n/types/experience.types";
import type { IconName } from "@/icons/icon.types";

export function adaptExperienceFromI18n(
  dict: ExperienceDictionary
): ExperienceModel {
  return {
    title: dict.title,
    subtitle: dict.subtitle,
    description: dict.description,
    techStack: dict.techStack,

    items: dict.items.map((item, index) => ({
      id: item.id ?? `experience-${index}`, // ✅ гарантований id
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description,
      achievements: item.achievements,
      stack: item.stack,
      icon: item.icon as IconName, // ✅ string → IconName
    })),
  };
}
