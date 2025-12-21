"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { AppIcon } from "@/icons/AppIcon";
import { cn } from "@/components/ui/utils";
import { motion as m } from "@/components/ui/motion";
import type { ExperienceItem } from "../experience.types";
import { experienceStyles as s } from "../experience.styles";

interface Props {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
  techStackLabel: string;
}

export const ExperienceTimelineItem = memo(function ExperienceTimelineItem({
  item,
  index,
  isLeft,
  techStackLabel,
}: Props) {
  return (
    <motion.li {...m("fadeUp", { order: index })} className={s.timeline.item}>
      {/* Timeline icon */}
      <div aria-hidden className={cn(s.timeline.iconBase, item.bgColor)}>
        <AppIcon name="experience" size={22} />
      </div>

      {/* Card */}
      <div
        className={cn(
          "ml-28 md:ml-0 md:w-[calc(50%-4rem)]",
          isLeft ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"
        )}
      >
        <div className={s.card.wrapperBase}>
          <h3 className={s.card.title}>
            {item.role}
            <span className={s.card.company}>{item.company}</span>
          </h3>

          <div className={s.card.period}>{item.period}</div>

          <p className={s.card.description}>{item.description}</p>

          <ul className={s.card.list}>
            {item.achievements.map((ach, i) => (
              <li key={i} className={s.card.listItem}>
                <span className={cn(s.card.bulletBase, item.color)} />
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
});
