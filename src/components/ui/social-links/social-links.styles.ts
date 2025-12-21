import { cva } from "class-variance-authority";

export const socialLinksWrapperStyles = cva("", {
  variants: {
    variant: {
      inline: "flex items-center gap-4 justify-center lg:justify-start",
      card: "grid grid-cols-1 sm:grid-cols-3 gap-4 ",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});
