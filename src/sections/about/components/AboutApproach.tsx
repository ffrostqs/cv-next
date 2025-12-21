"use client";

import { AppIcon } from "@/icons/AppIcon";
import type { AboutModel } from "../about.types";

export function AboutApproach({
  approach,
}: {
  approach: NonNullable<AboutModel["approach"]>;
}) {
  return (
    <div className="mt-24 rounded-3xl border border-slate-700/40 bg-slate-900/40 p-8">
      <h3 className="text-2xl text-white mb-8">{approach.title}</h3>

      <ul className="grid gap-6 md:grid-cols-3">
        {approach.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <AppIcon name={item.icon} size={16} />
              <h4 className="text-lg text-white">{item.title}</h4>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
