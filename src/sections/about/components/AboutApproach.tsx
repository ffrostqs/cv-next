// src/sections/about/components/AboutApproach.tsx
"use client";

import { AppIcon } from "@/icons/AppIcon";
import type { AboutModel } from "../about.types";
import { aboutStyles as s } from "../about.styles";

interface Props {
  approach: NonNullable<AboutModel["approach"]>;
}

export function AboutApproach({ approach }: Props) {
  return (
    <section className={s.approach.wrapper}>
      <h3 className={s.approach.title}>{approach.title}</h3>

      <ul className={s.approach.grid}>
        {approach.items.map((item) => (
          <li key={item.title} className={s.approach.item}>
            <div className={s.approach.itemHeader}>
              <AppIcon name={item.icon} size={16} />
              <h4 className={s.approach.itemTitle}>{item.title}</h4>
            </div>

            <p className={s.approach.itemDescription}>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
