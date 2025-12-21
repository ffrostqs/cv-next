"use client";

import { cn } from "@/components/ui/utils";
import { StatCard } from "../stat-card";
import type { StatListProps } from "./stat-list.types";
import { GRID_COLS, GRID_COLS_MD, GRID_COLS_LG } from "./stat-list.utils";
import { motion } from "framer-motion";
import { motion as m } from "@/components/ui/motion";

const DEFAULT_COLUMNS = {
  base: 1,
  md: 2,
  lg: 3,
} as const;

export function StatList({ items, columns, className }: StatListProps) {
  // 🔑 NORMALIZATION (ключовий момент)
  const resolvedColumns = {
    ...DEFAULT_COLUMNS,
    ...columns,
  };

  return (
    <ul
      role="list"
      className={cn(
        "grid gap-6",
        GRID_COLS[resolvedColumns.base],
        GRID_COLS_MD[resolvedColumns.md],
        GRID_COLS_LG[resolvedColumns.lg],
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
