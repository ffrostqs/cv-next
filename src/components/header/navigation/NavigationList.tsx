"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { navListStyles as s } from "./navigation.styles";
import type { NavItem } from "./navigation.types";
import { useActiveSection } from "@/hooks/useActiveSection";

interface Props {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export function NavigationList({
  items,
  orientation = "horizontal",
  onNavigate,
}: Props) {
  const { t } = useLanguage();

  // 🔑 тільки секції з nav
  const sectionIds = items.map((i) => i.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds, { offset: 96 });

  return (
    <ul className={s.list({ orientation })}>
      {items.map((item) => {
        const id = item.href.replace("#", "");
        const isActive = activeId === id;

        return (
          <li key={item.key}>
            <a
              href={item.href}
              className={s.item()}
              aria-current={isActive ? "location" : undefined}
              onClick={onNavigate}
            >
              {t(`nav.${item.key}`)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
