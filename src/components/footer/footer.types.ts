import type { IconName } from "@/icons/icon.types";

export interface FooterLink {
  label: string;
  href: string;
  icon?: IconName;
}

export interface FooterModel {
  tagline: string;
  navigation: FooterLink[];
  socials: FooterLink[];
  meta: {
    copyright: string;
    builtWith: string;
  };
}
