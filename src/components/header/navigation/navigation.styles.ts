// components/navigation/navigation.styles.ts

import { cva } from "class-variance-authority";

export const navWrapperStyles = cva("hidden md:flex items-center gap-6");

export const navListStyles = cva("flex items-center gap-8 px-6 py-4");

export const navLinkStyles = cva(
  "text-slate-600 dark:text-slate-300 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
);
