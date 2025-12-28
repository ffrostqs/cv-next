"use client";

import { AppIcon } from "@/icons/AppIcon";
import { SkillBadge } from "@/components/ui/skill-badge";
import type { SkillTreeGroup } from "../skills.types";

export function SkillTreeGroup({ group }: { group: SkillTreeGroup }) {
  return (
    <article className="rounded-2xl p-6 bg-slate-900/60 border border-slate-700/60">
      <header className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
          <AppIcon name={group.icon} size={18} decorative />
        </div>
        <h3 className="text-slate-100 font-semibold">{group.title}</h3>
      </header>

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillBadge key={skill}>{skill}</SkillBadge>
        ))}
      </div>
    </article>
  );
}
