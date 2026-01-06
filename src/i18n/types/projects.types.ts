import type { IconName } from "@/icons/icon.types";

export interface ProjectsDictionary {
  subtitle: string;
  title: string;
  description: string;
  items: {
    id: number;
    category: string;
    meta: string;
    image: string;
    title: string;
    description: string;
    problem: string;
    solution?: string;
    result?: string;
    tags: string[];
    stack: string[];
    links?: {
      label: string;
      url: string;
      icon: IconName;
    }[];
  }[];
}
