import { getDictionary } from "@/i18n/getDictionary";
import { adaptSkills } from "./skills.adapter";
import { SkillsClient } from "./Skills.client";

export async function Skills({ locale }: { locale: string }) {
  const dict = await getDictionary(locale);
  const skills = adaptSkills(dict.skills);

  return <SkillsClient skills={skills} />;
}
