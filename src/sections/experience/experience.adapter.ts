import type { ExperienceModel } from "./experience.types";
import type { ExperienceDictionary } from "@/i18n/types";

export function adaptExperienceFromI18n(
  dict: ExperienceDictionary
): ExperienceModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,
    techStack: dict.techStack,
    items: dict.items.map((item) => ({
      id: item.id,
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description,
      achievements: item.achievements ?? [],
      stack: item.stack ?? [],
      icon: item.icon ?? "briefcase",
      color: item.color ?? "from-cyan-500 to-orange-500",
      bgColor: item.bgColor ?? "bg-gradient-to-br from-cyan-500 to-orange-500",
    })),
  };
}
