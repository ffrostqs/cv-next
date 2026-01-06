import type { IconName } from "@/icons/icon.types";

export interface NavItem {
  key: string;
  href: string;
  icon?: IconName;
}
