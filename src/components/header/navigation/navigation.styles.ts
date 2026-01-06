import { cva, type VariantProps } from "class-variance-authority";

/**
 * ===============================
 * Navigation list styles
 * ===============================
 */
export const navListStyles = {
  list: cva("container mx-auto flex gap-6 p-4", {
    variants: {
      orientation: {
        horizontal: "items-center",
        vertical: "flex-col items-start gap-3",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }),

  item: cva(
    [
      "ui-link",
      "px-1 py-1",
      "text-sm font-medium",
      "rounded-md",

      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-[color:var(--color-primary)]",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-background",
    ].join(" ")
  ),
};

export type NavListVariants = VariantProps<typeof navListStyles.list>;

/**
 * ===============================
 * Mobile navigation styles
 * ===============================
 */
export const mobileNavStyles = {
  root: cva(
    [
      "absolute inset-x-0 top-full z-40",

      "bg-background",
      "border-t border-border",
      "shadow-xl",

      "px-6 pt-6",
      "pb-[calc(1.5rem+env(safe-area-inset-bottom))]",

      "will-change-transform",
    ].join(" ")
  ),
};
