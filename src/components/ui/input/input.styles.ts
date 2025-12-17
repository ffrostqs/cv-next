import { cva } from "class-variance-authority";

export const inputWrapperStyles = cva("flex flex-col gap-1");

export const inputFieldStyles = cva(
  [
    "flex w-full items-center gap-2",
    "rounded-md border bg-input-background px-3",
    "text-base transition-colors",
    "focus-within:ring-2 focus-within:ring-ring/50",
    "disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-9 text-sm",
        md: "h-11",
        lg: "h-13 text-lg",
      },
      state: {
        default: "border-input",
        error: "border-destructive focus-within:ring-destructive/40",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

export const inputElementStyles = cva(
  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
);
