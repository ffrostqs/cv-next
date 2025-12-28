"use client";

import { forwardRef } from "react";
import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import type { InputProps } from "./input.types";
import {
  inputWrapperStyles,
  inputFieldStyles,
  inputElementStyles,
} from "./input.styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size,
      iconLeft,
      iconRight,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const state = error ? "error" : "default";

    return (
      <div className={inputWrapperStyles()}>
        {/* Label */}
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        {/* Field */}
        <div className={cn(inputFieldStyles({ size, state }), className)}>
          {iconLeft && (
            <AppIcon
              name={iconLeft}
              size={18}
              decorative
              className="shrink-0 text-muted-foreground"
            />
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={!!error}
            className={inputElementStyles()}
            {...props}
          />

          {iconRight && (
            <AppIcon
              name={iconRight}
              size={18}
              decorative
              className="shrink-0 text-muted-foreground"
            />
          )}
        </div>

        {/* Helper / Error */}
        {(error || helperText) && (
          <p
            className={cn(
              "text-sm",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
