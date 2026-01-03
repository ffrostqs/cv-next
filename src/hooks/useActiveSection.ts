"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(
            (e) => e.isIntersecting && sectionIds.includes(e.target.id) // 🔑 КЛЮЧОВА ПЕРЕВІРКА
          )
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        setActiveId(visible ? visible.target.id : null);
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
