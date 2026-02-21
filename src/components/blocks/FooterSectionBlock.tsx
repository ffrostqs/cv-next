"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { FooterClient } from "@/components/footer/Footer.client";
import type { FooterModel } from "@/components/footer/footer.types";
import type { IconName } from "@/icons/icon.types";

type FooterProps = Partial<FooterModel> & {
  copyright?: string;
  links?: { label: string; href: string }[];
};

const DEFAULT_FOOTER: FooterModel = {
  tagline: "Let’s build something great together.",
  navigation: [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "GitHub", href: "#", icon: "github" as IconName },
    { label: "LinkedIn", href: "#", icon: "linkedin" as IconName },
    { label: "Email", href: "#", icon: "mail" as IconName },
  ],
  meta: {
    copyright: "© 2026 Your Name",
    builtWith: "Built with Next.js",
  },
};

function FooterSectionBlock({ block }: { block: Block }) {
  const props = block.props as FooterProps;

  const legacyNavigation =
    props.links && props.links.length > 0 ? props.links : undefined;

  const footer: FooterModel = {
    tagline: props.tagline ?? DEFAULT_FOOTER.tagline,
    navigation: props.navigation ?? legacyNavigation ?? DEFAULT_FOOTER.navigation,
    socials: props.socials ?? DEFAULT_FOOTER.socials,
    meta: props.meta ?? {
      ...DEFAULT_FOOTER.meta,
      copyright: props.copyright ?? DEFAULT_FOOTER.meta.copyright,
    },
  };

  return <FooterClient footer={footer} />;
}

export default memo(FooterSectionBlock);
