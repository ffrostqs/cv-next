import { cva } from "class-variance-authority";

/**
 * Tabs container
 * - horizontal scroll
 * - scrollbar hidden (cross-browser)
 * - mobile-first spacing
 */
export const tabsStyles = cva(
  `
    inline-flex
    max-w-full
    overflow-x-auto
    overscroll-x-contain
    gap-1
    rounded-lg
    border border-white/10
    bg-white/[0.03]
    p-0.5

    sm:gap-2
    sm:p-1

    /* scrollbar hide */
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  `
);

/**
 * Tab button
 * - touch friendly
 * - stable height
 * - accessible focus ring
 */
export const tabButtonStyles = cva(
  `
    relative
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-md

    px-2.5
    py-1
    min-h-[32px]
    text-[11px]
    font-medium

    transition-colors

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[color:var(--color-primary)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-background

    sm:px-3
    sm:py-1.5
    sm:text-xs
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
