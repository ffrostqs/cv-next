import { ProjectsClient } from "./Projects.client";
import type { ProjectsModel } from "./projects.types";

export function Projects({ projects }: { projects: ProjectsModel }) {
  return <ProjectsClient projects={projects} />;
}
