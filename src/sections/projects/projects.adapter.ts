// src/sections/projects/projects.adapter.ts
import type { ProjectsDictionary } from "@/i18n/types";
import type { ProjectsModel } from "./projects.types";
import type { IconName } from "@/icons/icon.types";

export function adaptProjects(dict: ProjectsDictionary): ProjectsModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,

    items: dict.items.map((item, index) => ({
      id: item.id,
      category: item.category,
      title: item.title,
      meta: item.meta,
      image: item.image,
      description: item.description,
      stack: item.stack,

      links: item.links?.map((link, i) => ({
        id: `project-${index}-link-${i}`,
        label: link.label,
        url: link.url,
        icon: link.icon as IconName,
      })),
    })),
  };
}
