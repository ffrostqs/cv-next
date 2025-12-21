// src/sections/about/about.adapter.ts

import type { AboutDictionary } from "@/i18n/types";
import type { AboutModel } from "./about.types";
import type { IconName } from "@/icons/icon.types";

export function adaptAbout(dict: AboutDictionary): AboutModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,

    stats: dict.stats?.map((stat) => ({
      id: stat.id,
      icon: stat.icon as IconName,
      value: stat.value,
      label: stat.label,
    })),

    approach: dict.approach
      ? {
          title: dict.approach.title,
          items: dict.approach.items.map((item) => ({
            icon: item.icon as IconName,
            title: item.title,
            description: item.description,
          })),
        }
      : undefined,
  };
}
