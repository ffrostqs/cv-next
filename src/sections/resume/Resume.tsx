// src/sections/resume/Resume.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { adaptResume } from "./resume.adapter";
import { ResumeClient } from "./Resume.client";

export function Resume() {
  const { tn } = useLanguage();
  const resume = adaptResume(tn("resume"));

  return <ResumeClient resume={resume} />;
}
