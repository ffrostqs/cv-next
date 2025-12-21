import { cva } from "class-variance-authority";

export const mediaFrameWrapperStyles = cva(
  "relative overflow-hidden p-1 rounded-2xl",
  {
    variants: {
      variant: {
        default:
          "relative h-full animate-surface-gradient bg-gradient-accent rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const mediaFrameInnerStyles = cva(
  "relative h-full w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800"
);
