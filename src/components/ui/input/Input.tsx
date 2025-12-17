import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { getIcon } from "@/icons/lucideNew";
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

    const LeftIcon = getIcon(iconLeft);
    const RightIcon = getIcon(iconRight);

    return (
      <div className={inputWrapperStyles()}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div className={cn(inputFieldStyles({ size, state }), className)}>
          {LeftIcon && (
            <LeftIcon
              size={18}
              className="shrink-0 text-muted-foreground"
              aria-hidden
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

          {RightIcon && (
            <RightIcon
              size={18}
              className="shrink-0 text-muted-foreground"
              aria-hidden
            />
          )}
        </div>

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
