"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
  LANGUAGE_META,
} from "@/config/languages";
import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);

  const rawLocale = segments[0];
  const currentLocale: Locale = isLocale(rawLocale)
    ? rawLocale
    : DEFAULT_LOCALE;

  function changeLocale(locale: Locale) {
    const nextSegments = [...segments];

    if (isLocale(nextSegments[0])) {
      nextSegments.shift();
    }

    if (locale !== DEFAULT_LOCALE) {
      nextSegments.unshift(locale);
    }

    router.push(`/${nextSegments.join("/")}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        size="sm"
        variant="outline"
      >
        <AppIcon name="languages" size={18} />
      </Button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 mt-3 w-48 overflow-hidden",
            "rounded-xl border border-white/10",
            "bg-[color:var(--surface-card)]",
            "shadow-xl backdrop-blur"
          )}
        >
          <ul className="py-2">
            {SUPPORTED_LOCALES.map((locale) => {
              const meta = LANGUAGE_META[locale];
              const isActive = locale === currentLocale;

              return (
                <li key={locale}>
                  <Button
                    variant="menu"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => changeLocale(locale)}
                    className={cn(
                      "relative w-full justify-start gap-2",
                      isActive
                        ? "text-[color:var(--color-primary)]"
                        : "ui-text-muted hover:bg-white/5"
                    )}
                  >
                    <span className="text-lg">{meta.flag}</span>
                    <span className="flex-1 text-sm">{meta.label}</span>

                    {isActive && (
                      <AppIcon
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        name="check"
                        size={16}
                      />
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
