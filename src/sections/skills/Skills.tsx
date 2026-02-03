import { SkillsClient } from "./Skills.client";
import type { SkillsModel } from "./skills.types";

export function Skills({ skills }: { skills: SkillsModel }) {
  return <SkillsClient skills={skills} />;
}
