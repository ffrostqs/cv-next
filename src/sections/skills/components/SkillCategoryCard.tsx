"use client";

import { motion } from "framer-motion";
import { AppIcon } from "@/icons/AppIcon";
import { SkillBadge } from "@/components/ui/skill-badge";
import type { SkillCategory } from "../skills.types";
import { motion as m } from "@/components/ui/motion";

interface Props {
  category: SkillCategory;
  index: number;
}

export function SkillCategoryCard({ category, index }: Props) {
  const titleId = `skill-${category.id}`;

  return (
    <motion.article
      {...m("fadeUp", { order: index })}
      aria-labelledby={titleId}
      tabIndex={0}
      className="
        group relative
        rounded-2xl p-6
        border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800/60
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        hover:border-purple-300 dark:hover:border-purple-700
        focus-visible:ring-2 focus-visible:ring-purple-500/40
      "
    >
      {/* subtle background accent */}
      <div
        aria-hidden
        className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-br from-purple-500/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity
        "
      />

      {/* header */}
      <div className="relative flex items-start gap-4 mb-5">
        <div
          className="
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-xl bg-purple-600/10
            text-purple-600 dark:text-purple-400
          "
        >
          <AppIcon name={category.icon} size={22} decorative />
        </div>

        <div>
          <h3
            id={titleId}
            className="text-lg font-semibold text-slate-900 dark:text-white"
          >
            {category.title}
          </h3>

          {category.description && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* skills */}
      <div className="relative flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillBadge key={skill}>{skill}</SkillBadge>
        ))}
      </div>
    </motion.article>
  );
}
