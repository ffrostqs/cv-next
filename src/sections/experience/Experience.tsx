import { getDictionary } from "@/i18n/getDictionary";
import { adaptExperienceFromI18n } from "./experience.adapter";
import { ExperienceClient } from "./Experience.client";

export async function Experience({ locale }: { locale: string }) {
  const dict = await getDictionary(locale);
  const experience = adaptExperienceFromI18n(dict.experience);

  return <ExperienceClient experience={experience} />;
}
