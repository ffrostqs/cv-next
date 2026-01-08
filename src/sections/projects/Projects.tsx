// src/sections/projects/Projects.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { adaptProjects } from "./projects.adapter";
import { ProjectsClient } from "./Projects.client";

export function Projects() {
  const { tn } = useLanguage();
  const projects = adaptProjects(tn("projects"));

  return <ProjectsClient projects={projects} />;
}
