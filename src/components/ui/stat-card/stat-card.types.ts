import type { IconName } from "@/icons/icon.types";

export interface StatCardProps {
  id: string;
  icon: IconName;
  value: string;
  label: string;
  description?: string;
  className?: string;
}
