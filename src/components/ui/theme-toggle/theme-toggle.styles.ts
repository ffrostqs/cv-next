import { cva } from "class-variance-authority";

export const toggleButton = cva(
  "relative flex h-10 w-10 items-center justify-center rounded-lg border transition-all",
  {
    variants: {
      theme: {
        light: "bg-white border-slate-200 text-slate-700 hover:border-blue-500",
        dark: "bg-slate-900 border-slate-700 text-slate-200 hover:border-blue-500",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);
