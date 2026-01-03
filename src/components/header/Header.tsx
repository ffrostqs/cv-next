"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { Navigation } from "./navigation/Navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { Button } from "@/components/ui/button/Button";
import { useLocaleFromParams } from "@/hooks/useLocaleFromParams";

import { headerStyles as s } from "./header.styles";

export function Header() {
  const locale = useLocaleFromParams();
  const [open, setOpen] = useState(false);

  return (
    <header className={s.root}>
      <div className={s.bar}>
        <div className={s.container}>
          <div className={s.inner}>
            <Logo href={`/${locale}`} />

            <Navigation />

            <div className={s.mobileActions}>
              <LanguageSwitcher />
              <ThemeToggle />

              <Button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                className={s.mobileButton}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </Button>
            </div>
          </div>
        </div>

        <MobileNavigation open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
