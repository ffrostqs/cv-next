import type { IconName } from "@/icons/icon.types";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  stack: string[];
  icon?: IconName;
}

export interface ExperienceModel {
  title: string;
  subtitle: string;
  description: string;
  techStack: string;
  items: ExperienceItem[];
}
