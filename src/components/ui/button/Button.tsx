"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
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

    return (
      <Comp
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        disabled={!asChild ? isDisabled : undefined}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {/* Slot-safe single child */}
        <span className="inline-flex items-center gap-2">
          {/* Loader */}
          {isLoading && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
          )}

          {/* Left icon */}
          {!isLoading && iconLeft && (
            <AppIcon name={iconLeft} size={16} decorative />
          )}

          {/* Label */}
          <span>{children}</span>

          {/* Right icon */}
          {!isLoading && iconRight && (
            <AppIcon name={iconRight} size={16} decorative />
          )}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";
