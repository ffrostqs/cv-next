"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { HeroClient } from "@/sections/hero/Hero.client";
import type { HeroModel } from "@/sections/hero/hero.types";

type HeroProps = {
  greeting?: string;
  name?: string;
  title?: string;
  description?: string;
  getInTouch?: string;
  resume?: string;
  resumeUrl?: string;
  location?: string;
  badgeAvailable?: string;
  badgeRemote?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  availability?: string;
};

function HeroSectionBlock({ block }: { block: Block }) {
  const props = block.props as HeroProps;

  const hero: HeroModel = {
    greeting: props.greeting ?? "Hello, I am",
    name: props.name ?? "Your Name",
    title: props.title ?? "Product Designer + Engineer",
    description:
      props.description ??
      "Crafting digital experiences with clarity, speed, and intent.",
    contact: "",
    resume: props.resume ?? props.secondaryLabel ?? "View resume",
    resumeUrl: props.resumeUrl ?? props.secondaryHref ?? "#",
    location: props.location ?? "Remote",
    getInTouch: props.getInTouch ?? props.primaryLabel ?? "Contact",
    badge: {
      available: props.badgeAvailable ?? props.availability ?? "Available",
      remote: props.badgeRemote ?? "Remote",
      status: "available",
    },
  };

  return <HeroClient hero={hero} />;
}

export default memo(HeroSectionBlock);
