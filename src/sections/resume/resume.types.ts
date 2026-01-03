import type { ResumeDictionary } from "@/i18n/types";

/**
 * Частини напряму з i18n
 */
export type ResumeMain = ResumeDictionary["resumeCard"];
export type ResumeContact = ResumeDictionary["contactCard"];
export type ResumeSocials = ResumeDictionary["socialCard"];

/**
 * UI-модель секції (без дублювання)
 */
export type ResumeModel = Pick<
  ResumeDictionary,
  "subtitle" | "title" | "description"
> & {
  resume: ResumeMain;
  contact: ResumeContact;
  socials: ResumeSocials;
};
