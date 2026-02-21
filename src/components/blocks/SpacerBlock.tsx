"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";

type SpacerProps = {
  height?: number;
  unit?: "px" | "vh";
};

function SpacerBlock({ block }: { block: Block }) {
  const props = block.props as SpacerProps;
  const height = typeof props.height === "number" ? props.height : 48;
  const unit = props.unit ?? "px";

  return (
    <div
      className="rounded-xl border border-dashed border-white/10 bg-white/5"
      style={{ height: `${height}${unit}` }}
    />
  );
}

export default memo(SpacerBlock);
