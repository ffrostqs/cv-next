import { cva } from "class-variance-authority";

export const buttonGroupStyles = cva("", {
  variants: {
    variant: {
      horizontal: "flex flex-wrap gap-4 mb-8",
      vertical: "flex flex-col gap-3 mb-8",
    },
  },
  defaultVariants: {
    variant: "horizontal",
  },
});
