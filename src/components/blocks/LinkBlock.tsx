"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";

type LinkProps = {
  label?: string;
  href?: string;
  target?: "_self" | "_blank";
};

function LinkBlock({ block }: { block: Block }) {
  const props = block.props as LinkProps;
  const label = props.label ?? "Link";
  const href = props.href ?? "#";
  const target = props.target ?? "_self";

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="text-sm font-medium text-[color:var(--color-primary)] underline"
    >
      {label}
    </a>
  );
}

export default memo(LinkBlock);
