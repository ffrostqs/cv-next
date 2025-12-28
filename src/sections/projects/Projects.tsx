// src/sections/projects/Projects.tsx
import { ProjectsClient } from "./Projects.client";
import { adaptProjects } from "./projects.adapter";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/config/locales";

export async function Projects({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const projects = adaptProjects(dict.projects);

  return <ProjectsClient projects={projects} />;
}
