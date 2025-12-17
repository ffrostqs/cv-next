import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  [
    // layout
    "inline-flex items-center justify-center",
    "gap-2", // ❗ іконка + текст
    "whitespace-nowrap",

    // base
    "rounded-lg font-medium transition-colors",

    // focus
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

    // disabled
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-600",

        outline:
          "border border-slate-300 text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",

        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-800",
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
