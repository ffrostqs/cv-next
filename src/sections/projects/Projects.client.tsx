"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs } from "@/components/ui/tabs";
import { motion as m } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { normalizeSkill } from "@/domain/skills/normalize-skill";

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
  const [visibleCount, setVisibleCount] = useState(2);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = useMemo(() => {
    const categories = Array.from(
      new Set(projects.items.map((item) => item.category))
    );

    return [
      { key: "all", label: projects.filters.all },
      ...categories.map((c) => ({ key: c, label: c })),
    ];
  }, [projects.items, projects.filters.all]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return projects.items;
    return projects.items.filter((i) => i.category === activeCategory);
  }, [activeCategory, projects.items]);

  const techParam = searchParams.get("tech");
  const techLabel = techParam ? decodeURIComponent(techParam) : null;
  const techNormalized = techLabel ? normalizeSkill(techLabel) : null;

  const techFilteredItems = useMemo(() => {
    if (!techNormalized) return filteredItems;
    return filteredItems.filter((project) =>
      project.stack.some((tech) => normalizeSkill(tech) === techNormalized)
    );
  }, [filteredItems, techNormalized]);

  useEffect(() => {
    setVisibleCount(2);
  }, [activeCategory, techNormalized]);

  const visibleItems = useMemo(
    () => techFilteredItems.slice(0, visibleCount),
    [techFilteredItems, visibleCount]
  );

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

        {techLabel && (
          <div className={s.filterBar}>
            <span className={s.filterLabel}>{projects.labels.filteredBy}:</span>
            <span className={s.filterValue}>{techLabel}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`${pathname}#${PROJECTS_SECTION_ID}`)}
            >
              {projects.labels.clear}
            </Button>
          </div>
        )}

        <ul className={s.grid} role="list">
          {visibleItems.map((project, index) => (
            <motion.li
              key={project.id}
              {...m("fadeUp", { order: index })}
              role="listitem"
            >
              <ProjectCard project={project} labels={projects.labels} />
            </motion.li>
          ))}
        </ul>

        {techFilteredItems.length > visibleCount && (
          <div className={s.showMore}>
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 2)}
            >
              {projects.filters.showMore}
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
