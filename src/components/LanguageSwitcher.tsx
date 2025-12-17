"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Languages, Check } from "lucide-react";

import {
  locales,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/config/locales";
import { LANGUAGE_META } from "@/config/languages";
import { cn } from "@/components/ui/utils";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");

  const rawLocale = segments[1];
  const currentLocale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  function changeLocale(locale: Locale) {
    const nextSegments = [...segments];
    nextSegments[1] = locale;

    router.push(nextSegments.join("/"));
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          "border border-slate-700 bg-slate-900/80",
          "text-slate-200 hover:bg-slate-800 transition",
          open && "ring-2 ring-cyan-500"
        )}
      >
        <Languages size={18} />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 mt-3 w-48 overflow-hidden",
            "rounded-xl border border-slate-700",
            "bg-gradient-to-b from-slate-900 to-slate-950",
            "shadow-xl backdrop-blur"
          )}
        >
          <ul className="py-2">
            {locales.map((locale) => {
              const meta = LANGUAGE_META[locale];
              const isActive = locale === currentLocale;

              return (
                <li key={locale}>
                  <button
                    role="option"
                    aria-selected={isActive}
                    onClick={() => changeLocale(locale)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left",
                      "text-sm transition-colors",
                      isActive
                        ? "bg-slate-800 text-violet-300"
                        : "text-slate-200 hover:bg-slate-800/60"
                    )}
                  >
                    <span className="text-lg">{meta.flag}</span>
                    <span className="flex-1">{meta.label}</span>
                    {isActive && (
                      <Check size={16} className="text-violet-400" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
