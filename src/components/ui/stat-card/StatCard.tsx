"use client";

import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import type { StatCardProps } from "./stat-card.types";
import {
  statCardStyles,
  statCardIcon,
  statCardValue,
  statCardLabel,
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

      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
