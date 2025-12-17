"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
const NAV_ITEMS = [
  { label: "Про мене", href: "#about" },
  { label: "Навички", href: "#skills" },
  { label: "Проєкти", href: "#projects" },
  { label: "Досвід", href: "#experience" },
  { label: "Контакти", href: "#contact" },
];

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center justify-between gap-6">
      {/* Links */}
      <ul className="flex items-center gap-8 px-6 py-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              scroll={false}
              className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Language switcher */}
      <LanguageSwitcher />
      <ThemeToggle />
    </nav>
  );
}
