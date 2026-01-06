"use client";

import { NavigationList } from "./NavigationList";
import { NAV_ITEMS } from "./navigation.config";
import { LanguageSwitcher } from "@/components/ui/language-switcher/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavigationList items={NAV_ITEMS} />

      <LanguageSwitcher />
      <ThemeToggle />
    </nav>
  );
}
