// src/sections/about/about.types.ts

import type { StatCardProps } from "@/components/ui/stat-card";
import type { IconName } from "@/icons/icon.types";

export type AboutVariant = "summary" | "full";

export interface AboutApproachItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface AboutModel {
  subtitle: string;
  title: string;
  description: string;

  stats?: StatCardProps[];

  approach?: {
    title: string;
    items: AboutApproachItem[];
  };
}
