"use client";

import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import type { InfoBadgeProps } from "./info-badge.types";
import { infoBadgeStyles } from "./info-badge.styles";

export function InfoBadge({
  children,
  icon,
  variant = "default",
  className,
}: InfoBadgeProps) {
  return (
    <div className={cn(infoBadgeStyles({ variant }), className)}>
      {icon && <AppIcon name={icon} size={16} decorative />}
      <span>{children}</span>
    </div>
  );
}
