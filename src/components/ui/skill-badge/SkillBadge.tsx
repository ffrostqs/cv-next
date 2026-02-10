// src/components/ui/skill-badge/SkillBadge.tsx
"use client";

import { cn } from "@/components/ui/utils";
import { skillBadgeStyles } from "./skill-badge.styles";
import type { SkillBadgeProps } from "./skill-badge.types";

export function SkillBadge({
  children,
  level = "core",
  usedIn,
  highlighted,
  onClick,
  className,
}: SkillBadgeProps) {
  const interactive = Boolean(onClick);

  return (
    <span
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!interactive) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        skillBadgeStyles({
          level,
          interactive,
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
