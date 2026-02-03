import { ResumeClient } from "./Resume.client";
import type { ResumeModel } from "./resume.types";

export function Resume({ resume }: { resume: ResumeModel }) {
  return <ResumeClient resume={resume} />;
}
