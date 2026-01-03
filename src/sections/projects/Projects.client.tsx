"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs } from "@/components/ui/tabs";

import { AppIcon } from "@/icons/AppIcon";
import { SkillBadge } from "@/components/ui/skill-badge";

import type { ProjectsModel } from "./projects.types";

export function ProjectsClient({ projects }: { projects: ProjectsModel }) {
  const { titleId, descriptionId } = useSectionIds("projects");

  /* -----------------------------
   * 1. tabs state
   * ----------------------------- */
  const [activeCategory, setActiveCategory] = useState("all");

  /* -----------------------------
   * 2. build tabs from data
   * ----------------------------- */
  const tabs = useMemo(() => {
    const categories = Array.from(
      new Set(projects.items.map((item) => item.category))
    );

    return [
      { key: "all", label: "All" },
      ...categories.map((c) => ({
        key: c,
        label: c,
      })),
    ];
  }, [projects.items]);

  /* -----------------------------
   * 3. filtered projects
   * ----------------------------- */
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects.items;

    return projects.items.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory, projects.items]);

  return (
    <Section id="projects">
      <SectionHeader
        icon="projects"
        badge={projects.subtitle}
        title={projects.title}
        description={projects.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      {/* -----------------------------
       * Tabs
       * ----------------------------- */}
      <div className="flex justify-center mb-12">
        <Tabs
          items={tabs}
          value={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* -----------------------------
       * Projects grid
       * ----------------------------- */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="
              group bg-white dark:bg-slate-800/50
              border border-slate-200 dark:border-slate-700
              rounded-2xl overflow-hidden
              transition-all
              hover:shadow-xl hover:border-purple-300
              dark:hover:border-purple-700
            "
          >
            {/* Image */}
            <div className="aspect-video overflow-hidden relative">
              <Image
                src="/images/portrait.png"
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-[50%_20%]"
              />

              {/* Category badge */}
              <div className="absolute flex items-center gap-1 top-4 right-4 px-3 py-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full shadow-lg">
                <AppIcon name="category" size={16} decorative />
                {project.category}
              </div>

              {/* Tags */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1
                      bg-white/90 dark:bg-slate-900/90
                      backdrop-blur-sm rounded-full
                      text-slate-900 dark:text-white text-sm"
                  >
                    <AppIcon name="tags" size={14} decorative />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((stack) => (
                  <SkillBadge key={stack}>{stack}</SkillBadge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.links?.map((link) => (
                  <a
                    key={`${project.id}-${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2
                      text-slate-600 dark:text-slate-400
                      hover:text-purple-600 dark:hover:text-purple-400
                      transition-colors
                    "
                  >
                    <AppIcon name={link.icon} size={16} decorative />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
