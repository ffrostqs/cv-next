"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs } from "@/components/ui/tabs";
import { motion as m } from "@/components/ui/motion";

import type { ProjectsModel } from "./projects.types";
import { PROJECTS_SECTION_ID } from "./projects.config";
import { projectsStyles as s } from "./projects.styles";
import { ProjectCard } from "./components/ProjectCard";

interface Props {
  projects: ProjectsModel;
}

export function ProjectsClient({ projects }: Props) {
  const { titleId, descriptionId } = useSectionIds(PROJECTS_SECTION_ID);
  const [activeCategory, setActiveCategory] = useState("all");

  const tabs = useMemo(() => {
    const categories = Array.from(
      new Set(projects.items.map((item) => item.category))
    );

    return [
      { key: "all", label: "All" },
      ...categories.map((c) => ({ key: c, label: c })),
    ];
  }, [projects.items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return projects.items;
    return projects.items.filter((i) => i.category === activeCategory);
  }, [activeCategory, projects.items]);

  return (
    <Section
      id={PROJECTS_SECTION_ID}
      variant="muted"
      glow
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={s.section}
    >
      <div className={s.root}>
        <SectionHeader
          icon={PROJECTS_SECTION_ID}
          badge={projects.subtitle}
          title={projects.title}
          description={projects.description}
          titleId={titleId}
          descriptionId={descriptionId}
        />

        <div className={s.tabsWrapper}>
          <Tabs
            items={tabs}
            value={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <ul className={s.grid} role="list">
          {filteredItems.map((project, index) => (
            <motion.li
              key={project.id}
              {...m("fadeUp", { order: index })}
              role="listitem"
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
