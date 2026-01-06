"use client";

import { useState } from "react";

import { Logo } from "@/components/ui/logo";
import { Navigation } from "./navigation/Navigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { LanguageSwitcher } from "@/components/ui/language-switcher/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { headerStyles as s } from "./header.styles";
import { useLocaleFromParams } from "@/hooks/useLocaleFromParams";
import { AppIcon } from "@/icons";

export function Header() {
  const locale = useLocaleFromParams();
  const [open, setOpen] = useState(false);

  return (
    <header className={s.root}>
      <div className={s.bar}>
        <div className={s.inner}>
          <Logo href={`/${locale}`} />

          <Navigation />

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
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

        <MobileNavigation open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
