import type { IconName } from "@/icons/icon.types";

export interface SkillCategory {
  id: string;
  icon: IconName;
  title: string;
  description?: string;
  skills: string[];
}

export interface SkillsModel {
  subtitle: string;
  title: string;
  description: string;
  categories: SkillCategory[];
  usage?: Record<string, number>;
}
