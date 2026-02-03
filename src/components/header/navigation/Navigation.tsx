"use client";

import { NavigationList } from "./NavigationList";
import { NAV_ITEMS } from "./navigation.config";
import { LanguageSwitcher } from "@/components/ui/language-switcher/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import type { NavDictionary } from "@/i18n/types";

export function Navigation({ labels }: { labels: NavDictionary }) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavigationList items={NAV_ITEMS} labels={labels} />

      <LanguageSwitcher />
      <ThemeToggle />
    </nav>
  );
}
