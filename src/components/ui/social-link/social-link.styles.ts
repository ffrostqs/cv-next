import { cva, type VariantProps } from "class-variance-authority";

/**
 * ======================================================
 * Root <a> — social link
 * ======================================================
 */
export const socialLinkStyles = cva(
  [
    "group",
    "inline-flex",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[color:var(--color-primary)]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        /**
         * Inline (header / footer / hero)
         */
        inline: [
          "items-center gap-2",

          "text-[color:var(--text-muted)]",
          "hover:text-[color:var(--color-primary)]",

          "dark:text-[color:var(--text-muted)]",
          "dark:hover:text-[color:var(--color-primary)]",
        ].join(" "),

        /**
         * Card (social grid)
         */
        card: [
          "flex-1",
          "flex flex-col items-center text-center",
          "rounded-lg p-4",

          "bg-[color:var(--surface-muted)]",
          "hover:bg-[color:var(--surface-accent-muted)]",

          "text-[color:var(--text-secondary)]",
          "hover:text-[color:var(--text-primary)]",

          "dark:bg-[color:var(--surface-muted)]",
          "dark:hover:bg-[color:var(--surface-accent-muted)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
);

export type SocialLinkVariants = VariantProps<typeof socialLinkStyles>;

/**
 * ======================================================
 * Icon wrapper
 * ======================================================
 */
export const socialIconBoxStyles = cva(
  ["flex items-center justify-center", "transition-colors"].join(" "),
  {
    variants: {
      variant: {
        inline: [
          "w-10 h-10 rounded-lg border",

          "bg-[color:var(--surface-muted)]",
          "border-[color:var(--border-default)]",

          "group-hover:border-[color:var(--color-primary)]",
          "group-hover:text-[color:var(--color-primary)]",

          "dark:bg-[color:var(--surface-muted)]",
          "dark:border-[color:var(--border-default)]",
        ].join(" "),

        card: [
          "mx-auto mb-2",

          "text-[color:var(--text-muted)]",
          "group-hover:text-[color:var(--color-primary)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
);

export type SocialIconBoxVariants = VariantProps<typeof socialIconBoxStyles>;

/**
 * ======================================================
 * Label
 * ======================================================
 */
export const socialLabelStyles = cva("", {
  variants: {
    variant: {
      inline: [
        "hidden sm:inline",

        "text-[color:var(--text-muted)]",
        "group-hover:text-[color:var(--color-primary)]",
      ].join(" "),

      card: ["text-sm font-medium", "text-[color:var(--text-primary)]"].join(
        " "
      ),
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});

export type SocialLabelVariants = VariantProps<typeof socialLabelStyles>;
