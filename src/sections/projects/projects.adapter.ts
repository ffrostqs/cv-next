import type { ProjectsDictionary } from "@/i18n/types";
import type { ProjectsModel } from "./projects.types";

export function adaptProjects(dict: ProjectsDictionary): ProjectsModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,
  };
}
