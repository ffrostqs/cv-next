"use client";

import type { SkillsModel } from "../skills.types";
import { SkillTreeGroup } from "./SkillTreeGroup";

export function SkillTree({ tree }: { tree: SkillsModel["tree"] }) {
  return (
    <div className="mt-32">
      <div className="flex justify-center mb-16">
        <div className="px-6 py-3 rounded-xl border border-slate-700/60 bg-slate-900/70 text-slate-200 text-sm font-medium">
          {tree.title}
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        {tree.groups.map((group) => (
          <SkillTreeGroup key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
