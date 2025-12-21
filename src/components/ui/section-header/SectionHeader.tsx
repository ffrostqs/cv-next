"use client";

import { motion } from "framer-motion";
import { motion as m } from "@/components/ui/motion";
import { cn } from "@/components/ui/utils";
import type { IconName } from "@/icons/icon.types";
import { InfoBadge } from "@/components/ui/info-badge";
import { sectionHeaderStyles as s } from "./section-header.styles";

interface Props {
  icon: IconName;
  badge: string;
  title: string;
  description?: string;
  titleId?: string;
  descriptionId?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  icon,
  badge,
  title,
  description,
  titleId,
  descriptionId,
  align = "center",
  className,
}: Props) {
  return (
    <motion.div
      {...m("fadeUp")}
      className={cn(
        s.wrapper,
        align === "left" ? s.align.left : s.align.center,
        className
      )}
    >
      <InfoBadge icon={icon}>{badge}</InfoBadge>

      <h2 id={titleId} className={s.title}>
        {title}
      </h2>

      {description && (
        <p id={descriptionId} className={s.description}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
