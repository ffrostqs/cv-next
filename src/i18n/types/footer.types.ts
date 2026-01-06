export interface FooterDictionary {
  tagline: string;

  navigation: {
    label: string;
    href: string;
  }[];

  socials: {
    label: string;
    href: string;
    icon: string;
  }[];

  copyright: string;
  builtWith: string;
}
