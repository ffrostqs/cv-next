import { getDictionary } from "@/i18n/getDictionary";
import { adaptProjects } from "./projects.adapter";
import { ProjectsClient } from "./Projects.client";

export async function Projects({ locale }: { locale: string }) {
  const dict = await getDictionary(locale);
  const projects = adaptProjects(dict.projects);

  return <ProjectsClient projects={projects} />;
}
