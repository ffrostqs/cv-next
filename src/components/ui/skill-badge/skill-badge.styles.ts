// src/components/ui/skill-badge/skill-badge.styles.ts
import { cva } from "class-variance-authority";

export const skillBadgeStyles = cva(
  `
    inline-flex
    items-center
    gap-1.5
    rounded-full
    px-3
    py-1
    text-xs
    font-medium
    border
    ui-surface-soft
    ui-text-muted
    transition-colors
  `,
  {
    variants: {
      level: {
        core: `
          ui-text-strong
          border-[color:var(--color-primary)]
        `,

        advanced: `
          ui-text
        `,

        familiar: `
          ui-text-muted
        `,
      },

      interactive: {
        true: `
          cursor-pointer
          hover:border-[color:var(--color-primary)]
          hover:ui-text-strong
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
