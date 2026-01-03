// src/sections/skills/Skills.tsx
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/config/locales";

import { adaptSkills } from "./skills.adapter";
import { SkillsClient } from "./Skills.client";

import { adaptProjects } from "@/sections/projects/projects.adapter";
import { calculateSkillUsage } from "@/domain/skills/skill-usage";

export async function Skills({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  const projects = adaptProjects(dict.projects);

  const usage = calculateSkillUsage(projects.items);

  const skills = adaptSkills(dict.skills);

  const skillsWithUsage = {
    ...skills,
    usage,
  };

  return <SkillsClient skills={skillsWithUsage} />;
}
