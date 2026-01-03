import type { FooterDictionary } from "@/i18n/types";
import type { FooterModel } from "./footer.types";

export function adaptFooter(dict: FooterDictionary): FooterModel {
  return {
    tagline: dict.tagline,
    navigation: dict.navigation,
    socials: dict.socials,
    meta: {
      copyright: dict.copyright,
      builtWith: dict.builtWith,
    },
  };
}
