import type { ProjectsModel } from "@/sections/projects/projects.types";
import { normalizeSkill } from "./normalize-skill";

export type SkillUsageMap = Record<string, number>;

export function calculateSkillUsage(
  projects: ProjectsModel["items"]
): SkillUsageMap {
  const usage: SkillUsageMap = {};

  for (const project of projects) {
    for (const skill of project.stack) {
      const key = normalizeSkill(skill);
      usage[key] = (usage[key] ?? 0) + 1;
    }
  }

  return usage;
}
