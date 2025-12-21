"use client";

import Link from "next/link";
import { Download } from "lucide-react";

import { NAV_ITEMS } from "./navigation.config";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: Props) {
  const { t } = useLanguage();

  return (
    <div
      className={`
        absolute left-0 right-0 top-full
        bg-white dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-800
        shadow-xl
        transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
    >
      <div className="p-6">
        {/* LINKS */}
        <nav className="mb-6">
          <ul className="space-y-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={onClose}
                  className="
                    block text-lg font-medium
                    text-slate-800 dark:text-slate-100
                    hover:text-cyan-600 dark:hover:text-cyan-400
                  "
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <a
          href="/resume.pdf"
          className="
            flex items-center justify-center gap-2
            w-full rounded-xl py-3
            bg-gradient-to-r from-cyan-500 to-blue-500
            text-black font-semibold
            hover:shadow-lg hover:shadow-cyan-500/40
          "
        >
          <Download size={18} />
          {t("hero.resume")}
        </a>
      </div>
    </div>
  );
}
