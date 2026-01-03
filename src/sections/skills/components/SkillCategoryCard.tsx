"use client";

import { motion } from "framer-motion";
import { AppIcon } from "@/icons/AppIcon";
import { SkillBadge } from "@/components/ui/skill-badge";
import type { SkillCategory } from "../skills.types";
import { motion as m } from "@/components/ui/motion";
import { normalizeSkill } from "@/domain/skills/normalize-skill";
interface Props {
  category: SkillCategory;
  index: number;
  usage?: Record<string, number>;
}

export function SkillCategoryCard({ category, index, usage }: Props) {
  return (
    <motion.div
      {...m("fadeUp", { order: index })}
      className="
        bg-white dark:bg-slate-800/50
        border border-slate-200 dark:border-slate-700
        rounded-2xl p-6
        hover:shadow-xl hover:border-purple-300
        dark:hover:border-purple-700
        transition-all
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center">
          <AppIcon name={category.icon} size={20} />
        </div>

        <div>
          <h3 className="text-lg text-slate-900 dark:text-white">
            {category.title}
          </h3>
          {category.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
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
