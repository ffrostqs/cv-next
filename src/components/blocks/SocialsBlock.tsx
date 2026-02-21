"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { SocialLinks } from "@/components/ui/social-links/SocialLinks";
import type { IconName } from "@/icons/icon.types";
import { cn } from "@/components/ui/utils";

type SocialItem = {
  href: string;
  icon: IconName;
  label: string;
};

type SocialsProps = {
  items?: SocialItem[];
  variant?: "inline" | "card";
  align?: "left" | "center";
};

function SocialsBlock({ block }: { block: Block }) {
  const props = block.props as SocialsProps;
  const items = props.items ?? [];
  const variant = props.variant ?? "inline";
  const align = props.align ?? "left";

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-3 text-sm text-[color:var(--text-secondary)]">
        Add social links.
      </div>
    );
  }

  return (
    <div className={cn(align === "center" ? "flex justify-center" : "flex justify-start")}>
      <SocialLinks items={items} variant={variant} />
    </div>
  );
}

export default memo(SocialsBlock);
