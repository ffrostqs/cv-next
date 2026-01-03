import type { ResumeDictionary } from "@/i18n/types";
import type { ResumeModel } from "./resume.types";

export function adaptResume(dict: ResumeDictionary): ResumeModel {
  return {
    subtitle: dict.subtitle,
    title: dict.title,
    description: dict.description,

    resume: dict.resumeCard,
    contact: dict.contactCard,
    socials: dict.socialCard,
  };
}
