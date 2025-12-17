import { cva } from "class-variance-authority";

export const heroBadgeStyles = cva(
  [
    "flex items-center gap-3",
    "rounded-2xl border p-4 shadow-xl",
    "bg-white dark:bg-slate-800",
  ].join(" "),
  {
    variants: {
      status: {
        available: "border-slate-200 dark:border-slate-700",
        busy: "border-yellow-300 dark:border-yellow-600",
        offline: "border-slate-300 dark:border-slate-600",
      },
    },
    defaultVariants: {
      status: "available",
    },
  }
);

export const heroBadgeDotStyles = cva("w-3 h-3 rounded-full", {
  variants: {
    status: {
      available: "bg-green-400 animate-pulse",
      busy: "bg-yellow-400",
      offline: "bg-slate-400",
    },
  },
});
