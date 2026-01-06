// src/sections/resume/resume.types.ts

import type { IconName } from "@/icons/icon.types";

/* ---------- UI submodels ---------- */

export interface ResumeCardModel {
  title: string;
  meta: string;
  features: string[];
  downloadLabel: string;
  fileUrl: string;
}

export interface ResumeContactModel {
  title: string;
  items: {
    icon: IconName;
    label: string;
    value: string;
  }[];
}

export interface ResumeSocialsModel {
  title: string;
  items: {
    icon: IconName;
    label: string;
    url: string;
  }[];
}

/* ---------- UI model ---------- */

export interface ResumeModel {
  subtitle: string;
  title: string;
  description: string;

  resume: ResumeCardModel;
  contact: ResumeContactModel;
  socials: ResumeSocialsModel;
}
