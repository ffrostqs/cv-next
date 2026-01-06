// src/sections/projects/projects.types.ts
import type { IconName } from "@/icons/icon.types";

export interface ProjectLinkModel {
  id: string;
  label: string;
  url: string;
  icon: IconName;
}

export interface ProjectsListItemModel {
  id: number;
  category: string;
  title: string;
  meta: string;
  image: string;
  description: string;
  stack: string[];
  links?: ProjectLinkModel[];
}

export interface ProjectsModel {
  subtitle: string;
  title: string;
  description: string;
  items: ProjectsListItemModel[];
}
