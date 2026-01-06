import type { IconName } from "@/icons/icon.types";
import type { FooterDictionary } from "@/i18n/types";
import type { FooterModel } from "./footer.types";

export function adaptFooter(dict: FooterDictionary): FooterModel {
  return {
    tagline: dict.tagline,

    navigation: dict.navigation,

    socials: dict.socials.map((item, index) => ({
      id: `footer-social-${index}`, // ✅ UI id
      label: item.label,
      href: item.href,
      icon: item.icon as IconName, // ✅ cast тут
    })),

    meta: {
      copyright: dict.copyright,
      builtWith: dict.builtWith,
    },
  };
}
