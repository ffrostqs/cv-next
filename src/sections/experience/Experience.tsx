import { ExperienceClient } from "./Experience.client";
import type { ExperienceModel } from "./experience.types";

export function Experience({ experience }: { experience: ExperienceModel }) {
  return <ExperienceClient experience={experience} />;
}
