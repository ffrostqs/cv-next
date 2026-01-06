// src/hooks/useActiveSection.ts
"use client";

import { useEffect, useState } from "react";

interface Options {
  offset?: number; // висота header
}

export function useActiveSection(
  sectionIds: string[],
  { offset = 96 }: Options = {}
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
