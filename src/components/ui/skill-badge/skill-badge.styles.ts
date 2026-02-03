// src/components/ui/skill-badge/skill-badge.styles.ts
import { cva } from "class-variance-authority";

export const skillBadgeStyles = cva(
  `
    inline-flex
    items-center
    gap-1.5
    rounded-full
    px-3
    py-1.5
    text-sm
    font-medium
    border
    bg-[color:var(--surface-muted)]
    text-[color:var(--text-primary)]
    border-[color:var(--border-default)]
    transition-colors
  `,
  {
    variants: {
      level: {
        core: `
          border-[color:var(--color-primary)]
          text-[color:var(--text-primary)]
        `,

        advanced: `
          text-[color:var(--text-primary)]
          opacity-85
        `,

        familiar: `
          text-[color:var(--text-secondary)]
          opacity-90
        `,
      },

      interactive: {
        true: `
          cursor-pointer
          hover:border-[color:var(--color-primary)]
          hover:text-[color:var(--text-primary)]
          hover:opacity-100
          hover:bg-[color:rgba(0,187,255,0.12)]
        `,
      },

      highlighted: {
        true: `
          border-[color:var(--color-primary)]
        `,
      },
    },

    defaultVariants: {
      level: "core",
    },
  }
);
