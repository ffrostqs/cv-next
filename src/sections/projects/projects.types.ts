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
  impact?: string[];
  problem?: string;
  solution?: string;
  result?: string;
  stack: string[];
  links?: ProjectLinkModel[];
}

export interface ProjectsModel {
  subtitle: string;
  title: string;
  description: string;
  filters: {
    all: string;
    showMore: string;
  };
  labels: {
    filteredBy: string;
    clear: string;
    viewCase: string;
    hideCase: string;
    problem: string;
    solution: string;
    result: string;
  };
  items: ProjectsListItemModel[];
}
