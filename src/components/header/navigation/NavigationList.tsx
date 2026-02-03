"use client";

import { navListStyles as s } from "./navigation.styles";
import type { NavItem } from "./navigation.types";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { NavDictionary } from "@/i18n/types";

interface Props {
  items: NavItem[];
  labels: NavDictionary;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export function NavigationList({
  items,
  labels,
  orientation = "horizontal",
  onNavigate,
}: Props) {
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
              {labels[item.key as keyof NavDictionary] ?? item.key}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
