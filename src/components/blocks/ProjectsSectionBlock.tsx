"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { ProjectsClient } from "@/sections/projects/Projects.client";
import type {
  ProjectLinkModel,
  ProjectsListItemModel,
  ProjectsModel,
} from "@/sections/projects/projects.types";
import type { IconName } from "@/icons/icon.types";

type ProjectsProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: Array<Partial<ProjectsListItemModel>>;
};

const DEFAULT_ITEMS: ProjectsListItemModel[] = [
  {
    id: 1,
    category: "Fintech",
    title: "Analytics Dashboard",
    meta: "2024",
    image: "",
    description: "Real-time dashboards for executive reporting.",
    impact: ["Reduced reporting time by 40%"],
    problem: "Fragmented reporting data",
    solution: "Unified metrics platform",
    result: "Faster executive decisions",
    stack: ["React", "TypeScript", "Postgres"],
    links: [
      { id: "demo", label: "Demo", url: "#", icon: "demo" as IconName },
    ],
  },
  {
    id: 2,
    category: "E-commerce",
    title: "Marketplace Redesign",
    meta: "2023",
    image: "",
    description: "Boosted conversion with new onboarding flow.",
    impact: ["+18% conversion"],
    problem: "High drop-off",
    solution: "Streamlined onboarding",
    result: "More activated sellers",
    stack: ["Next.js", "Stripe", "Prisma"],
    links: [
      { id: "case", label: "Case study", url: "#", icon: "demo" as IconName },
    ],
  },
];

function normalizeLinks(links?: ProjectLinkModel[]): ProjectLinkModel[] | undefined {
  if (!links || links.length === 0) return undefined;
  return links.map((link, index) => ({
    id: link.id ?? `link-${index + 1}`,
    label: link.label ?? "Link",
    url: link.url ?? "#",
    icon: (link.icon as IconName) ?? "demo",
  }));
}

function normalizeItems(items?: Array<Partial<ProjectsListItemModel>>): ProjectsListItemModel[] {
  if (!items || items.length === 0) return DEFAULT_ITEMS;

  return items.map((item, index) => ({
    id: item.id ?? index + 1,
    category: item.category ?? "Project",
    title: item.title ?? "Project title",
    meta: item.meta ?? "",
    image: item.image ?? "",
    description: item.description ?? "",
    impact: item.impact ?? [],
    problem: item.problem,
    solution: item.solution,
    result: item.result,
    stack: item.stack ?? [],
    links: normalizeLinks(item.links as ProjectLinkModel[]),
  }));
}

function ProjectsSectionBlock({ block }: { block: Block }) {
  const props = block.props as ProjectsProps;

  const projects: ProjectsModel = {
    title: props.title ?? "Projects",
    subtitle: props.subtitle ?? "Case studies",
    description:
      props.description ??
      "Selected work showcasing strategy, design, and delivery.",
    filters: {
      all: "All",
      showMore: "Show more",
    },
    labels: {
      filteredBy: "Filtered by",
      clear: "Clear",
      viewCase: "View case",
      hideCase: "Hide case",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
    },
    items: normalizeItems(props.items),
  };

  return <ProjectsClient projects={projects} />;
}

export default memo(ProjectsSectionBlock);
