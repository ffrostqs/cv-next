import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-lg font-medium transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-white",
          "hover:opacity-90",
          "focus-visible:ring-primary",
        ].join(" "),

        outline: [
          "border border-slate-300",
          "text-primary",
          "hover:bg-slate-100",
          "focus-visible:ring-primary",
          "dark:border-slate-700 dark:hover:bg-slate-800",
        ].join(" "),

        ghost: [
          "bg-transparent",
          "text-primary",
          "hover:bg-slate-100",
          "focus-visible:ring-primary",
          "dark:hover:bg-slate-800",
        ].join(" "),
      },

      size: {
        sm: "h-9 px-3 text-sm",
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
