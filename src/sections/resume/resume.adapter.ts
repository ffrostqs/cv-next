// src/sections/resume/resume.adapter.ts

import type { ResumeDictionary } from "@/i18n/types";
import type { ResumeModel } from "./resume.types";
import type { IconName } from "@/icons/icon.types";

export function adaptResume(dict: ResumeDictionary): ResumeModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,

    resume: {
      title: dict.resumeCard.title,
      meta: dict.resumeCard.meta,
      features: dict.resumeCard.features,
      downloadLabel: dict.resumeCard.downloadLabel,
      fileUrl: dict.resumeCard.fileUrl,
    },

    contact: {
      title: dict.contactCard.title,
      items: dict.contactCard.items.map((item) => ({
        icon: item.icon as IconName, // 🔑 КЛЮЧОВЕ
        label: item.label,
        value: item.value,
      })),
    },

    socials: {
      title: dict.socialCard.title,
      items: dict.socialCard.items.map((item) => ({
        icon: item.icon as IconName, // 🔑 КЛЮЧОВЕ
        label: item.label,
        url: item.url,
      })),
    },
  };
}
