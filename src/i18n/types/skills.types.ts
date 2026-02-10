import type { IconName } from "@/icons/icon.types";

export interface SkillsDictionary {
  subtitle: string;
  title: string;
  description: string;
  focusAreas?: {
    title: string;
    items: {
      id: string;
      icon: string;
      title: string;
      description: string;
    }[];
  };

  categories: {
    id: string;
    icon: string; // 🔑 тільки string у словнику
    title: string;
    description?: string;
    skills: string[];
  }[];

  tree?: {
    // ✅ optional
    title: string;
    groups: {
      id: string;
      icon: string; // 🔑 тільки string
      title: string;
      skills: string[];
    }[];
  };
}
