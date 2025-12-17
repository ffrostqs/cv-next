import { cva } from "class-variance-authority";

export const mediaFrameWrapperStyles = cva("relative rounded-2xl p-[2px]", {
  variants: {
    variant: {
      default: "bg-slate-800",
      "gradient-animated":
        "bg-gradient-to-br from-cyan-500 via-orange-500 to-amber-500 animate-gradient",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const mediaFrameInnerStyles = cva(
  "relative overflow-hidden rounded-[14px] bg-slate-900 h-full w-full"
);
