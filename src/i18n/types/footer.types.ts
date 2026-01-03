import type { IconName } from "@/icons/icon.types";

export interface FooterDictionary {
  tagline: string;

  navigation: {
    label: string;
    href: string;
  }[];

  socials: {
    label: string;
    href: string;
    icon: IconName;
  }[];

  copyright: string;
  builtWith: string;
}
