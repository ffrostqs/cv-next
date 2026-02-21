"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { SocialLinks } from "@/components/ui/social-links/SocialLinks";
import { HERO_SOCIALS } from "@/sections/hero/hero.config";
import type { IconName } from "@/icons/icon.types";

type SocialItem = {
  href: string;
  icon: IconName;
  label: string;
};

type HeroSocialsProps = {
  items?: SocialItem[];
};

function HeroSocialsBlock({ block }: { block: Block }) {
  const props = block.props as HeroSocialsProps;
  const items = (props.items ?? HERO_SOCIALS) as SocialItem[];

  return <SocialLinks items={items} />;
}

export default memo(HeroSocialsBlock);
