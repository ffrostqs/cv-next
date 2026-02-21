"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { IconName } from "@/icons/icon.types";
import { cn } from "@/components/ui/utils";

type ButtonItem = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  iconLeft?: IconName;
  iconRight?: IconName;
};

type ButtonsProps = {
  items?: ButtonItem[];
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
};

function ButtonsBlock({ block }: { block: Block }) {
  const props = block.props as ButtonsProps;
  const items = props.items ?? [];
  const align = props.align ?? "left";
  const size = props.size ?? "md";

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-3 text-sm text-[color:var(--text-secondary)]">
        Add buttons.
      </div>
    );
  }

  return (
    <div className={cn(align === "center" ? "flex justify-center" : "flex justify-start")}>
      <ButtonGroup className={align === "center" ? "justify-center" : "justify-start"}>
        {items.map((item, index) => (
          <Button
            key={`${item.label}-${index}`}
            variant={item.variant ?? "primary"}
            size={size}
            iconLeft={item.iconLeft}
            iconRight={item.iconRight}
            asChild
          >
            <a href={item.href ?? "#"}>{item.label}</a>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default memo(ButtonsBlock);
