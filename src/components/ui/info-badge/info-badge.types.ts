import type { IconName } from "@/icons/icon.types";

export type InfoBadgeVariant = "default" | "muted" | "accent";

export interface InfoBadgeProps {
  children: React.ReactNode;
  icon?: IconName;
  variant?: InfoBadgeVariant;
  className?: string;
}
