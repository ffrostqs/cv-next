"use client";

import { navListStyles as s } from "./navigation.styles";
import type { NavItem } from "./navigation.types";
import { useActiveSection } from "@/hooks/useActiveSection";

interface Props {
  items: { href: string; label: string }[];
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export function NavigationListClient({
  items,
  orientation = "horizontal",
  onNavigate,
}: Props) {
  const sectionIds = items.map((i) => i.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds, { offset: 96 });

  return (
    <ul className={s.list({ orientation })}>
      {items.map((item) => {
        const id = item.href.replace("#", "");
        const isActive = activeId === id;

        return (
          <li key={item.href}>
            <a
              href={item.href}
              className={s.item()}
              aria-current={isActive ? "location" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
