import { forwardRef, createElement } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/utils/cn";
import { getIcon } from "@/icons/lucideNew";
import { buttonStyles } from "./button.styles";
import type { ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,

      iconLeft,
      iconRight,
      isLoading = false,
      asChild = false,

      children,
      disabled,

      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;

    const LeftIcon = iconLeft ? getIcon(iconLeft) : null;
    const RightIcon = iconRight ? getIcon(iconRight) : null;

    return (
      <Comp
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        disabled={!asChild ? isDisabled : undefined}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {/* ⬇️ ЄДИНИЙ child для Slot */}
        <span className="inline-flex items-center gap-2">
          {isLoading && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
          )}

          {!isLoading &&
            LeftIcon &&
            createElement(LeftIcon, {
              size: 16,
              "aria-hidden": true,
            })}

          <span>{children}</span>

          {!isLoading &&
            RightIcon &&
            createElement(RightIcon, {
              size: 16,
              "aria-hidden": true,
            })}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";
