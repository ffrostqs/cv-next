"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { ExperienceClient } from "@/sections/experience/Experience.client";
import type { ExperienceItem, ExperienceModel } from "@/sections/experience/experience.types";
import type { IconName } from "@/icons/icon.types";

type ExperienceProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  techStack?: string;
  items?: Array<Partial<ExperienceItem>>;
};

const DEFAULT_ITEMS: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Product Designer",
    company: "Studio Alpha",
    companyUrl: "https://example.com",
    period: "2021 — Present",
    description: "Led cross-functional teams to ship new fintech experiences.",
    achievements: ["Improved activation by 30%", "Shipped 4 major releases"],
    stack: ["Figma", "React", "Node.js"],
    icon: "experience",
  },
  {
    id: "exp-2",
    role: "Senior Designer",
    company: "Nova Labs",
    companyUrl: "https://example.com",
    period: "2018 — 2021",
    description: "Scaled design systems and UX for B2B platforms.",
    achievements: ["Built design system", "Introduced user research cadence"],
    stack: ["TypeScript", "Next.js", "Storybook"],
    icon: "projects",
  },
];

function normalizeItems(items?: Array<Partial<ExperienceItem>>): ExperienceItem[] {
  if (!items || items.length === 0) return DEFAULT_ITEMS;

  return items.map((item, index) => ({
    id: item.id ?? `exp-${index + 1}`,
    role: item.role ?? "Role",
    company: item.company ?? "Company",
    companyUrl: item.companyUrl ?? "#",
    period: item.period ?? "",
    description: item.description ?? "",
    achievements: item.achievements ?? [],
    stack: item.stack ?? [],
    icon: (item.icon as IconName) ?? "experience",
  }));
}

function ExperienceSectionBlock({ block }: { block: Block }) {
  const props = block.props as ExperienceProps;

  const experience: ExperienceModel = {
    title: props.title ?? "Experience",
    subtitle: props.subtitle ?? "Selected roles",
    description:
      props.description ??
      "Highlights from recent roles and responsibilities.",
    techStack: props.techStack ?? "Tech stack",
    items: normalizeItems(props.items),
  };

  return <ExperienceClient experience={experience} />;
}

export default memo(ExperienceSectionBlock);
