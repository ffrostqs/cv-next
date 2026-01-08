// src/sections/skills/Skills.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { adaptSkills } from "./skills.adapter";
import { SkillsClient } from "./Skills.client";

import { adaptProjects } from "@/sections/projects/projects.adapter";
import { calculateSkillUsage } from "@/domain/skills/skill-usage";

export function Skills() {
  const { tn } = useLanguage();

  // береться з i18n-контексту
  const projects = adaptProjects(tn("projects"));
  const usage = calculateSkillUsage(projects.items);

  const skills = adaptSkills(tn("skills"));

  return (
    <SkillsClient
      skills={{
        ...skills,
        usage,
      }}
    />
  );
}
