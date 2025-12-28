"use client";

import { cn } from "@/components/ui/utils";
import { tabsStyles, tabButtonStyles } from "./tabs.styles";
import type { TabsProps } from "./tabs.types";

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(tabsStyles(), className)}
    >
      {items.map((tab) => {
        const isActive = tab.key === value;

        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={tabButtonStyles({ active: isActive })}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
