"use client";

import { useState } from "react";

import { Logo } from "@/components/ui/logo";
import { Navigation } from "./navigation/Navigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { LanguageSwitcher } from "@/components/ui/language-switcher/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { headerStyles as s } from "./header.styles";
import { AppIcon } from "@/icons";
import type { Locale } from "@/config/languages";
import type { GlobalDictionary } from "@/i18n/types";
import type { LocaleItem } from "@/lib/locales";

export function Header({
  locale,
  navItems,
  globalLabels,
  locales,
}: {
  locale: Locale;
  navItems: { id: string; href: string; label: string }[];
  globalLabels: GlobalDictionary;
  locales: LocaleItem[];
}) {
  const [open, setOpen] = useState(false);
  const defaultLocale = locales.find((item) => item.isDefault) ?? locales[0];
  const homeHref =
    locale === (defaultLocale?.code as Locale) ? "/" : `/${locale}`;

  return (
    <header className={s.root}>
      <div className={s.bar}>
        <div className={s.inner}>
          <Logo
            href={homeHref}
            label={globalLabels.goHome}
            name={globalLabels.name}
          />

          <Navigation items={navItems} locales={locales} />

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher locales={locales} />
            <ThemeToggle />

            <Button
              variant="ghost"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <AppIcon name="close" size={22} />
              ) : (
                <AppIcon name="menu" size={22} />
              )}
            </Button>
          </div>
        </div>

        <MobileNavigation
          open={open}
          onClose={() => setOpen(false)}
          items={navItems}
        />
      </div>
    </header>
  );
}
