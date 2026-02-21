"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type StatItem = {
  label: string;
  value: string;
};

type StatsProps = {
  title?: string;
  stats?: StatItem[];
  columns?: number;
};

function StatsBlock({ block }: { block: Block }) {
  const props = block.props as StatsProps;
  const title = props.title ?? "Key stats";
  const stats = props.stats ?? [
    { label: "Projects", value: "24" },
    { label: "Years", value: "8+" },
    { label: "Clients", value: "12" },
  ];
  const columns = Math.min(Math.max(props.columns ?? 3, 1), 4);
  const gridClass = cn(
    columns === 1 && "md:grid-cols-1",
    columns === 2 && "md:grid-cols-2",
    columns === 3 && "md:grid-cols-3",
    columns === 4 && "md:grid-cols-4"
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h4 className="text-sm font-semibold text-[color:var(--text-primary)]">
        {title}
      </h4>
      <div className={cn("mt-4 grid gap-4", gridClass)}>
        {stats.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(StatsBlock);
