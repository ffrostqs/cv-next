"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "muted";
};

function SectionBlock({ block }: { block: Block }) {
  const props = block.props as SectionProps;
  const align = props.align ?? "left";
  const tone = props.tone ?? "default";
  const title = props.title ?? "Section title";
  const subtitle = props.subtitle ?? "Add a short supporting description.";
  const eyebrow = props.eyebrow ?? "Section";

  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 px-6 py-8",
        tone === "muted" ? "bg-white/5" : "bg-white/10"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          align === "center" ? "items-center text-center" : "items-start text-left"
        )}
      >
        <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-secondary)]">
          {eyebrow}
        </span>
        <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">
          {title}
        </h3>
        <p className="max-w-xl text-sm text-[color:var(--text-secondary)]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default memo(SectionBlock);
