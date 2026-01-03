// src/components/ui/skill-badge/skill-badge.styles.ts
import { cva } from "class-variance-authority";

export const skillBadgeStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all",
  {
    variants: {
      level: {
        core: "bg-purple-600/10 text-purple-700 border-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/40",
        advanced:
          "bg-cyan-600/10 text-cyan-700 border-cyan-300 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/40",
        familiar:
          "bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 hover:shadow-sm",
      },
      highlighted: {
        true: "ring-1 ring-purple-400/40",
      },
    },
    defaultVariants: {
      level: "core",
    },
  }
);
