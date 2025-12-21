"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Section, useSectionIds } from "@/components/ui/section";
import type { ProjectsModel } from "./projects.types";

export function ProjectsClient({ projects }: { projects: ProjectsModel }) {
  const { titleId, descriptionId } = useSectionIds("projects");

  return (
    <Section id="projects" className="py-32">
      <SectionHeader
        icon="projects"
        badge={projects.subtitle}
        title={projects.title}
        description={projects.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />
    </Section>
  );
}
