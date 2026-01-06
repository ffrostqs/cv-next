// src/sections/skills/skills.adapter.ts

import type { SkillsDictionary } from "@/i18n/types";
import type { SkillsModel } from "./skills.types";
import type { IconName } from "@/icons/icon.types";

export function adaptSkills(dict: SkillsDictionary): SkillsModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,

    categories: dict.categories.map((cat) => ({
      id: cat.id,
      icon: cat.icon as IconName, // 🔑 ОБОВʼЯЗКОВО
      title: cat.title,
      description: cat.description,
      skills: cat.skills,
    })),
  };
}
