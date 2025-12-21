"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { Navigation } from "./navigation/Navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import { useLocaleFromParams } from "@/hooks/useLocaleFromParams";
import { MobileNavigation } from "./navigation/MobileNavigation";

export function Header() {
  const locale = useLocaleFromParams();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* TOP BAR */}
      <div
        className="
          relative
          bg-white/95 dark:bg-slate-950/95
          supports-[backdrop-filter]:backdrop-blur-lg
          border-b border-slate-200 dark:border-slate-800
          shadow-lg
        "
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Logo href={`/${locale}`} />

            <Navigation />

            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                className="
                  w-10 h-10 flex items-center justify-center
                  rounded-lg
                  text-slate-700 dark:text-slate-300
                  hover:bg-slate-100 dark:hover:bg-slate-800
                "
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU — ABSOLUTE */}
        <MobileNavigation open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
