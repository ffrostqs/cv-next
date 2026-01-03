"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/useActiveSection";

import { NAV_ITEMS } from "./navigation.config";

export function Navigation() {
  const { t } = useLanguage();

  const sectionIds = NAV_ITEMS.map((item) => item.key);
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="hidden lg:flex items-center gap-6" aria-label="Main">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            document
              .getElementById(item.key)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="ui-link ui-link--nav"
          aria-current={activeSection === item.key ? "location" : undefined}
        >
          {t(`nav.${item.key}`)}
        </button>
      ))}

      <LanguageSwitcher />
      <ThemeToggle />

      <Button variant="outline" iconLeft="download" asChild>
        <a href="/resume.pdf" download>
          {t("hero.resume")}
        </a>
      </Button>
    </nav>
  );
}
