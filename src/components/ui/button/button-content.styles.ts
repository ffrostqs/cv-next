import { cva } from "class-variance-authority";

export const buttonContentStyles = cva(
  ["relative", "inline-flex items-center gap-2"].join(" "),
  {
    variants: {
      variant: {
        primary: "",
        outline: "",
        ghost: "",
        menu: "w-full justify-start",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
