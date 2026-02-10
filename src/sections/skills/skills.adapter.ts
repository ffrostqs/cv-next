// src/sections/skills/skills.adapter.ts

import type { SkillsDictionary } from "@/i18n/types";
import type { SkillsModel } from "./skills.types";
import type { IconName } from "@/icons/icon.types";

export function adaptSkills(dict: SkillsDictionary): SkillsModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,
    focusAreas: dict.focusAreas
      ? {
          title: dict.focusAreas.title,
          items: dict.focusAreas.items.map((item) => ({
            id: item.id,
            icon: item.icon as IconName,
            title: item.title,
            description: item.description,
          })),
        }
      : undefined,

    categories: dict.categories.map((cat) => ({
      id: cat.id,
      icon: cat.icon as IconName, // 🔑 ОБОВʼЯЗКОВО
      title: cat.title,
      description: cat.description,
      skills: cat.skills,
    })),
  };
}
