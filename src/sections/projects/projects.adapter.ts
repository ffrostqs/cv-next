// src/sections/projects/projects.adapter.ts
import type { ProjectsDictionary } from "@/i18n/types";
import type { ProjectsModel } from "./projects.types";
import type { IconName } from "@/icons/icon.types";

export function adaptProjects(dict: ProjectsDictionary): ProjectsModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,
    filters: {
      all: dict.filters?.all ?? "All",
      showMore: dict.filters?.showMore ?? "Show more",
    },
    labels: {
      filteredBy: dict.labels?.filteredBy ?? "Filtered by",
      clear: dict.labels?.clear ?? "Clear",
      viewCase: dict.labels?.viewCase ?? "View case",
      hideCase: dict.labels?.hideCase ?? "Hide case",
      problem: dict.labels?.problem ?? "Problem",
      solution: dict.labels?.solution ?? "Solution",
      result: dict.labels?.result ?? "Result",
    },

    items: dict.items.map((item, index) => ({
      id: item.id,
      category: item.category,
      title: item.title,
      meta: item.meta,
      image: item.image,
      description: item.description,
      impact: item.impact,
      problem: item.problem,
      solution: item.solution,
      result: item.result,
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
