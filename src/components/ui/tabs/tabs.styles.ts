import { cva } from "class-variance-authority";

export const tabsStyles = cva(
  "inline-flex gap-2 rounded-full bg-slate-800/60 p-1 backdrop-blur"
);

export const tabButtonStyles = cva(
  `
    px-4 py-2 rounded-full text-sm font-medium
    transition-all
    focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
  `,
  {
    variants: {
      active: {
        true: `
          bg-gradient-to-r from-violet-600 to-fuchsia-600
          text-white shadow-md
        `,
        false: `
          text-slate-300
          hover:bg-slate-700/60
        `,
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
