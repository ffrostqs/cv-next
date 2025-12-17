import { cva } from "class-variance-authority";

/* root <a> */
export const socialLinkStyles = cva("group transition-colors", {
  variants: {
    variant: {
      inline:
        "flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400",

      card: "flex-1 rounded-lg bg-slate-50 p-4 text-center transition-colors hover:bg-purple-50 dark:bg-slate-900/50 dark:hover:bg-purple-900/20",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});

/* icon wrapper */
export const socialIconBoxStyles = cva("", {
  variants: {
    variant: {
      inline:
        "w-10 h-10 flex items-center justify-center rounded-lg border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors group-hover:border-cyan-500",

      card: "mx-auto mb-2 text-slate-600 dark:text-slate-400 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});

/* label */
export const socialLabelStyles = cva("", {
  variants: {
    variant: {
      inline: "hidden sm:inline",
      card: "text-slate-900 dark:text-white",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});
