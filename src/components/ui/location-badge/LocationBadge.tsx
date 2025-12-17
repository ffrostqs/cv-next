"use client";

import { cn } from "@/components/ui/utils";
import type { LocationBadgeProps } from "./location-badge.types";
import { locationBadgeStyles } from "./location-badge.styles";

export function LocationBadge({
  children,
  icon: Icon,
  variant,
  className,
}: LocationBadgeProps) {
  return (
    <div className={cn(locationBadgeStyles({ variant }), className)}>
      {Icon && <Icon size={16} aria-hidden />}
      <span>{children}</span>
    </div>
  );
}
