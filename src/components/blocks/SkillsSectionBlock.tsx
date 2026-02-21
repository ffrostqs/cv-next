"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { SkillsClient } from "@/sections/skills/Skills.client";
import type { SkillsModel } from "@/sections/skills/skills.types";
import type { IconName } from "@/icons/icon.types";

type SkillsProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  focusAreas?: SkillsModel["focusAreas"];
  categories?: SkillsModel["categories"];
};

const DEFAULT_SKILLS: SkillsModel = {
  subtitle: "Focus",
  title: "Skills",
  description: "Core competencies and tools in daily use.",
  focusAreas: {
    title: "Focus areas",
    items: [
      {
        id: "fa-1",
        icon: "frontend" as IconName,
        title: "Product UX",
        description: "User flows, prototyping, testing.",
      },
      {
        id: "fa-2",
        icon: "backend" as IconName,
        title: "Engineering",
        description: "Full-stack delivery with clean architecture.",
      },
      {
        id: "fa-3",
        icon: "tools" as IconName,
        title: "Systems",
        description: "Design systems and tooling.",
      },
    ],
  },
  categories: [
    {
      id: "cat-1",
      icon: "frontend" as IconName,
      title: "Design",
      description: "UX/UI systems",
      skills: ["Figma", "Design systems", "Prototyping"],
    },
    {
      id: "cat-2",
      icon: "backend" as IconName,
      title: "Engineering",
      description: "Product build",
      skills: ["React", "Next.js", "Node.js"],
    },
  ],
  usage: undefined,
};

function SkillsSectionBlock({ block }: { block: Block }) {
  const props = block.props as SkillsProps;

  const skills: SkillsModel = {
    subtitle: props.subtitle ?? DEFAULT_SKILLS.subtitle,
    title: props.title ?? DEFAULT_SKILLS.title,
    description: props.description ?? DEFAULT_SKILLS.description,
    focusAreas: props.focusAreas ?? DEFAULT_SKILLS.focusAreas,
    categories: props.categories ?? DEFAULT_SKILLS.categories,
    usage: undefined,
  };

  return <SkillsClient skills={skills} />;
}

export default memo(SkillsSectionBlock);
