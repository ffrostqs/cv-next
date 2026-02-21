"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { cn } from "@/components/ui/utils";

export function ConfirmSubmitButton({
  confirmMessage,
  className,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  confirmMessage?: string;
}) {
  return (
    <button
      {...props}
      className={cn(className)}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (confirmMessage) {
          const ok = window.confirm(confirmMessage);
          if (!ok) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
        }
        onClick?.(event);
      }}
    />
  );
}
