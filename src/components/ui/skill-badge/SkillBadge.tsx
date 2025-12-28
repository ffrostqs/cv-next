"use client";

import { cn } from "@/components/ui/utils";
import type { SkillBadgeProps } from "./skill-badge.types";
import { skillBadgeStyles } from "./skill-badge.styles";

export function SkillBadge({
  children,
  level = "core",
  usedIn,
  highlighted,
  onClick,
  className,
}: SkillBadgeProps) {
  const isInteractive = !!onClick;

  return (
    <span
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!isInteractive) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        skillBadgeStyles({
          level,
          interactive: isInteractive,
          highlighted,
        }),
        className
      )}
      aria-label={usedIn ? `${children}, used in ${usedIn} projects` : children}
    >
      {children}

      {typeof usedIn === "number" && (
        <span className="text-[10px] opacity-70">· {usedIn}</span>
      )}
    </span>
  );
}
