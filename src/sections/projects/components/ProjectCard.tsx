"use client";

import { useState } from "react";
import Image from "next/image";
import { AppIcon } from "@/icons/AppIcon";
import type { ProjectsModel } from "../projects.types";
import { projectsStyles as s } from "../projects.styles";

interface Props {
  project: ProjectsModel["items"][number];
}

const DEFAULT_IMAGE = "/images/default_projects.png";

export function ProjectCard({ project }: Props) {
  const [imgSrc, setImgSrc] = useState(
    project.image && project.image.trim() !== "" ? project.image : DEFAULT_IMAGE
  );

  return (
    <article className={s.card.wrapper}>
      {/* Header */}
      <header className={s.card.header}>
        <h3 className={s.card.title}>{project.title}</h3>
        {project.meta && <span className={s.card.meta}>{project.meta}</span>}
      </header>

      {/* Description */}
      <p className={s.card.description}>{project.description}</p>

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
