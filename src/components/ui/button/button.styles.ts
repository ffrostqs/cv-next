import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-lg font-medium",

    "transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",

    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[color:var(--color-primary)]",
          "text-[color:var(--button-primary-text)]",
          "hover:opacity-90",
          "focus-visible:ring-[color:var(--color-primary)]",
        ].join(" "),

        outline: [
          "border border-[color:var(--border-default)]",
          "text-[color:var(--text-primary)]",

          "transition-colors duration-200 ease-out",

          "hover:border-[color:var(--color-primary)]",
          "hover:text-[color:var(--color-primary)]",
          "hover:bg-[color:var(--surface-muted)]",

          "focus-visible:ring-[color:var(--color-primary)]",
        ].join(" "),

        ghost: [
          "bg-transparent",
          "text-[color:var(--color-primary)]",
          "hover:bg-[color:var(--surface-muted)]",
          "focus-visible:ring-[color:var(--color-primary)]",
        ].join(" "),

        menu: [
          "w-full bg-transparent",
          "text-[color:var(--text-primary)]",
          "rounded-md",

          "transition-colors duration-150 ease-out",
          "hover:bg-[color:var(--surface-muted)]",

          "focus-visible:ring-[color:var(--color-primary)]",
        ].join(" "),
      },

      size: {
        sm: "h-10 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
