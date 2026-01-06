// src/components/ui/stat-list/StatList.tsx
"use client";

import { cn } from "@/components/ui/utils";
import { StatCard } from "../stat-card";
import type { StatListProps } from "./stat-list.types";
import { statListStyles as s } from "./stat-list.styles";
import { motion } from "framer-motion";
import { motion as m } from "@/components/ui/motion";

const DEFAULT_COLUMNS = {
  base: 1,
  md: 2,
  lg: 3,
} as const;

export function StatList({ items, columns, className }: StatListProps) {
  const resolvedColumns = {
    ...DEFAULT_COLUMNS,
    ...columns,
  };

  return (
    <ul
      role="list"
      className={cn(
        s.root,
        s.columns.base[resolvedColumns.base],
        s.columns.md[resolvedColumns.md],
        s.columns.lg[resolvedColumns.lg],
        className
      )}
    >
      {items.map((item, index) => (
        <motion.li {...m("fadeUp", { order: index })} key={index}>
          <StatCard {...item} />
        </motion.li>
      ))}
    </ul>
  );
}
