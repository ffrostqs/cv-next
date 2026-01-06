"use client";

import { motion } from "framer-motion";
import { motion as m } from "@/components/ui/motion";
import { AppIcon } from "@/icons/AppIcon";
import { SkillBadge } from "@/components/ui/skill-badge";

import type { SkillCategory } from "../skills.types";
import { skillsStyles as s } from "../skills.styles";
import { normalizeSkill } from "@/domain/skills/normalize-skill";

interface Props {
  category: SkillCategory;
  index: number;
  usage?: Record<string, number>;
}

export function SkillCategoryCard({ category, index, usage }: Props) {
  return (
    <motion.div {...m("fadeUp", { order: index })} className={s.card.wrapper}>
      {/* Header */}
      <div className={s.card.header}>
        <div className={s.card.iconBox}>
          <AppIcon name={category.icon} size={20} />
        </div>

        <div>
          <h3 className={s.card.title}>{category.title}</h3>

          {category.description && (
            <p className={s.card.description}>{category.description}</p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className={s.card.skills}>
        {category.skills.map((skill) => {
          const usedIn = usage?.[normalizeSkill(skill)];

          return (
            <SkillBadge key={skill} usedIn={usedIn}>
              {skill}
            </SkillBadge>
          );
        })}
      </div>
    </motion.div>
  );
}
