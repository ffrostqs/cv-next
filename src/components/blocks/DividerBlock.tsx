"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type DividerProps = {
  style?: "solid" | "dashed";
  spacing?: "sm" | "md" | "lg";
};

function DividerBlock({ block }: { block: Block }) {
  const props = block.props as DividerProps;
  const style = props.style ?? "solid";
  const spacing = props.spacing ?? "md";

  return (
    <div
      className={cn(
        spacing === "sm" && "py-2",
        spacing === "md" && "py-4",
        spacing === "lg" && "py-6"
      )}
    >
      <div
        className={cn(
          "w-full border-t",
          style === "solid" ? "border-white/15" : "border-dashed border-white/20"
        )}
      />
    </div>
  );
}

export default memo(DividerBlock);
