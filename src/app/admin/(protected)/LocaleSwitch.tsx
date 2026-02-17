"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/icons";
import { cn } from "@/components/ui/utils";
import { LANGUAGE_META } from "@/config/languages";

export function LocaleSwitch({
  value,
  options,
}: {
  value: string;
  options: { code: string; name: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active =
    options.find((locale) => locale.code === value) ?? options[0];

  function changeLocale(code: string) {
    router.push(`${pathname}?locale=${code}`);
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
            {options.map((locale) => {
              const isActive = locale.code === active?.code;
              const flag = LANGUAGE_META[
                locale.code as keyof typeof LANGUAGE_META
              ]?.flag;

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
                    <span className="text-lg">{flag ?? "🌐"}</span>
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
