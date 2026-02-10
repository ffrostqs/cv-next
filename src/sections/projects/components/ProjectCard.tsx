"use client";

import { useState } from "react";
import Image from "next/image";
import { AppIcon } from "@/icons/AppIcon";
import type { ProjectsModel } from "../projects.types";
import { projectsStyles as s } from "../projects.styles";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  project: ProjectsModel["items"][number];
  labels: ProjectsModel["labels"];
}

const DEFAULT_IMAGE = "/images/default_projects.png";

export function ProjectCard({ project, labels }: Props) {
  const [imgSrc, setImgSrc] = useState(
    project.image && project.image.trim() !== "" ? project.image : DEFAULT_IMAGE
  );
  const [open, setOpen] = useState(false);
  const hasCase = Boolean(project.problem || project.solution || project.result);

  return (
    <article className={s.card.wrapper}>
      {/* Header */}
      <header className={s.card.header}>
        <h3 className={s.card.title}>{project.title}</h3>
        {project.meta && <span className={s.card.meta}>{project.meta}</span>}
      </header>

      {/* Description */}
      <p className={s.card.description}>{project.description}</p>

      {project.impact && project.impact.length > 0 && (
        <ul className={s.card.impact} aria-label="Impact highlights">
          {project.impact.map((item, index) => (
            <motion.li
              key={item}
              className={s.card.impactItem}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      )}

      {/* Preview (with runtime fallback) */}
      <div className={s.card.imageWrapper}>
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className={s.card.image}
          onError={() => {
            if (imgSrc !== DEFAULT_IMAGE) {
              setImgSrc(DEFAULT_IMAGE);
            }
          }}
        />
      </div>

      {/* Stack */}
      <ul className={s.card.stack} aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech} className={s.card.stackItem}>
            {tech}
          </li>
        ))}
      </ul>

      {hasCase && (
        <div className={s.card.case}>
          <button
            type="button"
            className={s.card.caseToggle}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            {open ? labels.hideCase : labels.viewCase}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                className={s.card.caseBody}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {project.problem && (
                  <div>
                    <div className={s.card.caseLabel}>{labels.problem}</div>
                    <p>{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <div className={s.card.caseLabel}>{labels.solution}</div>
                    <p>{project.solution}</p>
                  </div>
                )}
                {project.result && (
                  <div>
                    <div className={s.card.caseLabel}>{labels.result}</div>
                    <p>{project.result}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Links */}
      {project.links && (
        <footer className={s.card.links}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.card.link}
            >
              <AppIcon name={link.icon} size={14} decorative />
              {link.label}
            </a>
          ))}
        </footer>
      )}
    </article>
  );
}
