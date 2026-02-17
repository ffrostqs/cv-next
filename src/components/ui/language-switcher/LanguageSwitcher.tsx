"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons";
import type { LocaleItem } from "@/lib/locales";

export function LanguageSwitcher({ locales }: { locales: LocaleItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);

  const rawLocale = segments[0];
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const currentLocale =
    locales.find((locale) => locale.code === rawLocale) ?? defaultLocale;

  function changeLocale(code: string) {
    const nextSegments = [...segments];

    if (locales.some((locale) => locale.code === nextSegments[0])) {
      nextSegments.shift();
    }

    if (code !== defaultLocale?.code) {
      nextSegments.unshift(code);
    }

    router.push(`/${nextSegments.join("/")}`);
    setOpen(false);
  }

  return (
    <div className="relative z-50">
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        size="sm"
        variant="outline"
        className="h-9 w-9 rounded-xl p-0"
        aria-label="Change language"
      >
        <AppIcon name="languages" size={18} />
      </Button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 mt-3 min-w-[180px] overflow-hidden",
            "rounded-2xl border border-white/10",
            "bg-[color:var(--surface-card)]",
            "shadow-xl backdrop-blur"
          )}
        >
          <ul className="py-2">
            {locales.map((locale) => {
              const isActive = locale.code === currentLocale?.code;

              return (
                <li key={locale.code}>
                  <Button
                    variant="menu"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => changeLocale(locale.code)}
                    className={cn(
                      "relative w-full justify-start gap-3 px-4 py-2",
                      isActive
                        ? "text-[color:var(--color-primary)]"
                        : "text-[color:var(--text-primary)] hover:bg-white/5"
                    )}
                  >
                    <span className="text-lg">{locale.flag ?? "🌐"}</span>
                    <span className="flex-1 text-sm">{locale.name}</span>

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
