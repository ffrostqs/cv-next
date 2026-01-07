// src/sections/experience/components/ExperienceTimelineItem.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import { motion as m } from "@/components/ui/motion";

import type { ExperienceItem } from "../experience.types";
import { experienceStyles as s } from "../experience.styles";

interface Props {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
  techStackLabel: string;
}

export function ExperienceTimelineItem({
  item,
  index,
  isLeft,
  techStackLabel,
}: Props) {
  return (
    <motion.li
      {...m("fadeUp", { order: index })}
      className={s.timeline.item}
      role="listitem"
    >
      {/* Icon */}
      <div aria-hidden className={cn(s.timeline.iconBase)}>
        <AppIcon name={item.icon ?? "experience"} size={22} decorative />
      </div>

      {/* Card */}
      <div
        className={cn(
          s.timeline.itemWrapper,
          isLeft ? s.timelineAlign.left : s.timelineAlign.right
        )}
      >
        <div className={s.card.wrapper}>
          <h3 className={s.card.title}>
            {item.role}
            <span>{item.company}</span>
          </h3>

          <div className={s.card.period}>{item.period}</div>

          <p className={s.card.description}>{item.description}</p>

          <ul className={s.card.list}>
            {item.achievements.map((ach, i) => (
              <li key={i} className={s.card.listItem}>
                <span className={cn(s.card.bullet)} />
                {ach}
              </li>
            ))}
          </ul>

          <div className={s.card.stack}>
            <strong>{techStackLabel}</strong> {item.stack.join(", ")}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
