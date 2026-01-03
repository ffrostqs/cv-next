import type { IconName } from "@/icons/icon.types";

export interface SkillsDictionary {
  subtitle: string;
  title: string;
  description: string;

  categories: {
    id: string;
    icon: IconName;
    title: string;
    description?: string;
    skills: string[];
  }[];

  tree: {
    title: string;
    groups: {
      id: string;
      icon: IconName;
      title: string;
      skills: string[];
    }[];
  };
}
