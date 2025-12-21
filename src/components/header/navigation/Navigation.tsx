"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

import { NAV_ITEMS } from "./navigation.config";

export function Navigation() {
  const { t } = useLanguage();

  return (
    <div className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          className="
            text-slate-600 dark:text-slate-300
            hover:text-cyan-600 dark:hover:text-cyan-400
            transition-colors
          "
        >
          {t(`nav.${item.key}`)}
        </button>
      ))}

      <LanguageSwitcher />
      <ThemeToggle />

      <Button
        className="
          bg-gradient-to-r from-cyan-500 to-blue-500
          hover:shadow-lg hover:shadow-cyan-500/50
          transition-all
        "
      >
        <Download className="mr-2 h-4 w-4" />
        {t("hero.resume")}
      </Button>
    </div>
  );
}
