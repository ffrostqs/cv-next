import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/config/languages";
import { adaptResume } from "./resume.adapter";
import { ResumeClient } from "./Resume.client";

export async function Resume({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const resume = adaptResume(dict.resume);

  return <ResumeClient resume={resume} />;
}
