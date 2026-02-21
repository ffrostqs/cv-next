"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { AboutClient } from "@/sections/about/About.client";
import type { AboutModel, AboutApproachItem } from "@/sections/about/about.types";
import type { StatCardProps } from "@/components/ui/stat-card";
import type { IconName } from "@/icons/icon.types";

type AboutProps = {
  subtitle?: string;
  title?: string;
  description?: string;
  stats?: StatCardProps[];
  approach?: {
    title?: string;
    items?: AboutApproachItem[];
  };
  highlights?: string[];
};

const DEFAULT_STATS: StatCardProps[] = [
  {
    id: "years",
    icon: "experience",
    value: "8+",
    label: "Years",
    description: "Product & engineering",
  },
  {
    id: "projects",
    icon: "projects",
    value: "24",
    label: "Projects",
    description: "Delivered end-to-end",
  },
  {
    id: "tools",
    icon: "tools",
    value: "15+",
    label: "Tools",
    description: "Design & dev stack",
  },
];

const DEFAULT_APPROACH: { title: string; items: AboutApproachItem[] } = {
  title: "Approach",
  items: [
    {
      icon: "frontend" as IconName,
      title: "Product strategy",
      description: "Clarify the outcome and shape the narrative.",
    },
    {
      icon: "architecture" as IconName,
      title: "System thinking",
      description: "Design scalable flows, not isolated screens.",
    },
    {
      icon: "backend" as IconName,
      title: "Execution",
      description: "Bridge design and engineering for fast delivery.",
    },
  ],
};

function buildApproach(props: AboutProps): AboutModel["approach"] {
  if (props.approach?.items && props.approach.items.length > 0) {
    return {
      title: props.approach.title ?? DEFAULT_APPROACH.title,
      items: props.approach.items,
    };
  }

  if (props.highlights && props.highlights.length > 0) {
    return {
      title: "Highlights",
      items: props.highlights.map((text, index) => ({
        icon: "check" as IconName,
        title: text,
        description: index === 0 ? "" : "",
      })),
    };
  }

  return DEFAULT_APPROACH;
}

function AboutSectionBlock({ block }: { block: Block }) {
  const props = block.props as AboutProps;

  const about: AboutModel = {
    subtitle: props.subtitle ?? "Summary",
    title: props.title ?? "Designing products with clarity.",
    description:
      props.description ??
      "Describe your background, mission, or what makes you different.",
    stats: props.stats && props.stats.length > 0 ? props.stats : DEFAULT_STATS,
    approach: buildApproach(props),
  };

  return <AboutClient about={about} />;
}

export default memo(AboutSectionBlock);
