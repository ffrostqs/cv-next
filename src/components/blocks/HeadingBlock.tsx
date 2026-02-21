"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type HeadingProps = {
  text?: string;
  level?: 1 | 2 | 3 | 4;
  align?: "left" | "center";
  eyebrow?: string;
};

function HeadingBlock({ block }: { block: Block }) {
  const props = block.props as HeadingProps;
  const text = props.text ?? "Heading";
  const level = props.level ?? 2;
  const align = props.align ?? "left";
  const eyebrow = props.eyebrow ?? "";

  const Tag = (`h${level}` as keyof JSX.IntrinsicElements);

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          {eyebrow}
        </div>
      ) : null}
      <Tag
        className={cn(
          "mt-2 font-semibold text-[color:var(--text-primary)]",
          level === 1 && "text-4xl",
          level === 2 && "text-3xl",
          level === 3 && "text-2xl",
          level === 4 && "text-xl"
        )}
      >
        {text}
      </Tag>
    </div>
  );
}

export default memo(HeadingBlock);
