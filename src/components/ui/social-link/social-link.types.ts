import type { AnchorHTMLAttributes } from "react";
import type { IconName } from "@/icons/icon.types";

export type SocialLinkVariant = "inline" | "card";

export interface SocialLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: IconName;
  label: string;
  variant?: SocialLinkVariant;
}
