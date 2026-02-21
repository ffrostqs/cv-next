"use client";

import type { ReactNode } from "react";
import { memo } from "react";
import { cn } from "@/components/ui/utils";

function BlockWrapperComponent({
  id,
  selected,
  dragging,
  onSelect,
  disableInteractions,
  children,
  className,
}: {
  id: string;
  selected?: boolean;
  dragging?: boolean;
  onSelect?: (id: string) => void;
  disableInteractions?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onSelect?.(id)}
      onKeyDown={(event) => {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
        ) {
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(id);
        }
      }}
      className={cn(
        "group relative rounded-2xl border border-transparent bg-white/0 px-4 py-5 transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60",
        dragging ? "opacity-60" : "opacity-100",
        selected ? "border-cyan-200/60 bg-white/5" : "hover:border-white/20",
        className
      )}
      data-selected={selected ? "true" : "false"}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl border transition",
          selected
            ? "border-cyan-200/60 shadow-[0_0_0_1px_rgba(56,189,248,0.3)]"
            : "border-white/10 opacity-0 group-hover:opacity-100"
        )}
      />
      <div
        className={cn(
          "relative z-10",
          disableInteractions ? "editor-disable-interactions" : ""
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const BlockWrapper = memo(BlockWrapperComponent);
