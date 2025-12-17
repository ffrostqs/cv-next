import { cva } from "class-variance-authority";

export const logoWrapperStyles = cva(
  "group flex items-center gap-3 focus:outline-none"
);

export const logoIconStyles = cva(
  `
  flex h-10 w-10 items-center justify-center rounded-full
  bg-gradient-to-br from-cyan-500 via-orange-500 to-amber-500
  text-white shadow-lg shadow-cyan-500/30
  transition-transform duration-300
  group-hover:scale-105
`
);

export const logoTextStyles = cva(
  `
  text-base font-medium text-slate-900 dark:text-white
  transition-colors
  group-hover:text-cyan-600 dark:group-hover:text-cyan-400
`
);
