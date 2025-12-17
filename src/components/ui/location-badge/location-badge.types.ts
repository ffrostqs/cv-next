import type { LucideIcon } from "lucide-react";

export type LocationBadgeVariant = "default" | "accent";

export interface LocationBadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: LocationBadgeVariant;
  className?: string;
}
