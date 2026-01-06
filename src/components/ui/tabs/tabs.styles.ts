import { cva } from "class-variance-authority";

export const tabsStyles = cva(
  `
    inline-flex
    gap-2
    rounded-lg
    border border-white/10
    bg-white/[0.03]
    p-1
  `
);

export const tabButtonStyles = cva(
  `
    relative
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-md
    px-3
    py-1.5
    text-xs
    font-medium
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[color:var(--color-primary)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-background
  `,
  {
    variants: {
      active: {
        true: `
          bg-white/[0.06]
          text-white
        `,
        false: `
          text-white/60
          hover:text-white
        `,
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
