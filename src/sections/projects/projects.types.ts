import type { StatCardProps } from "@/components/ui/stat-card";
import type { IconName } from "@/icons/icon.types";

export type ProjectsVariant = "summary" | "full";

export interface ProjectsApproachItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface ProjectsModel {
  subtitle: string;
  title: string;
  description: string;

  stats?: StatCardProps[];

  approach?: {
    title: string;
    items: ProjectsApproachItem[];
  };
}
