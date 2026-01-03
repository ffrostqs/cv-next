"use client";

import Link from "next/link";
import { cn } from "@/components/ui/utils";
import type { LogoProps } from "./logo.types";
import { logoWrapperStyles, logoIconStyles } from "./logo.styles";
import { AppIcon } from "@/icons";
import { useLanguage } from "@/contexts/LanguageContext";

export function Logo({ href, className }: LogoProps) {
  const { t } = useLanguage();

  return (
    <Link
      href={href}
      className={cn(logoWrapperStyles(), className)}
      aria-label={t("global.goHome")}
    >
      <div className={logoIconStyles()}>
        <AppIcon name="logo" size={18} aria-hidden />
      </div>

      <span className="ui-link ui-link--nav">{t("global.name")}</span>
    </Link>
  );
}
