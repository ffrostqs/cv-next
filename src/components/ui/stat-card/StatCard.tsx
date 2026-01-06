// src/components/ui/stat-card/StatCard.tsx
"use client";

import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import type { StatCardProps } from "./stat-card.types";
import {
  statCardStyles,
  statCardIcon,
  statCardValue,
  statCardLabel,
  statCardDescription,
} from "./stat-card.styles";

export function StatCard({
  icon,
  value,
  label,
  description,
  className,
}: StatCardProps) {
  return (
    <div className={cn(statCardStyles(), className)}>
      <div className={statCardIcon} aria-hidden>
        <AppIcon name={icon} size={22} />
      </div>

      <div className={statCardValue}>{value}</div>

      <div className={statCardLabel}>{label}</div>

      {description && <p className={statCardDescription}>{description}</p>}
    </div>
  );
}
