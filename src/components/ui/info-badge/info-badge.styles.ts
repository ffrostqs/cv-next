import { cva } from "class-variance-authority";

export const infoBadgeStyles = cva(
  `
    inline-flex items-center gap-2
    rounded-full px-4 py-2
    text-sm font-medium
    transition-colors
    mb-6
  `,
  {
    variants: {
      variant: {
        default: `
          bg-cyan-500/10 text-cyan-600
          dark:text-cyan-400
        `,
        accent: `
          bg-purple-500/10 text-purple-600
          dark:text-purple-400
        `,
        muted: "bg-transparent text-[var(--text-muted)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
