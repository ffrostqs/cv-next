import type { IconName } from "@/icons/icon.types";

export type SocialLinksVariant = "inline" | "card";

export interface SocialLinkItem {
  href: string;
  icon: IconName;
  label: string;
}

export interface SocialLinksProps {
  items: readonly SocialLinkItem[];
  variant?: SocialLinksVariant;
  className?: string;
}
