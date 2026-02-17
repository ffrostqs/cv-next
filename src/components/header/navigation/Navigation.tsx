"use client";

import { NavigationList } from "./NavigationList";
import { LanguageSwitcher } from "@/components/ui/language-switcher/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import type { LocaleItem } from "@/lib/locales";

export function Navigation({
  items,
  locales,
}: {
  items: { id: string; href: string; label: string }[];
  locales: LocaleItem[];
}) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavigationList items={items} />

      <LanguageSwitcher locales={locales} />
      <ThemeToggle />
    </nav>
  );
}
