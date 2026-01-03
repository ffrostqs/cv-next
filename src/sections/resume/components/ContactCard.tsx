"use client";

import { AppIcon } from "@/icons/AppIcon";
import type { IconName } from "@/icons/icon.types";

interface ContactCardProps {
  data: {
    title: string;
    items: {
      icon: IconName;
      label: string;
      value: string;
    }[];
  };
}

export function ContactCard({ data }: ContactCardProps) {
  return (
    <div
      className="
        rounded-3xl p-6
        bg-slate-900/40
        border border-slate-700/40
        backdrop-blur
      "
    >
      <h3 className="text-lg font-semibold text-white mb-4">{data.title}</h3>

      <ul className="space-y-4">
        {data.items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0">
              <AppIcon name={item.icon} size={16} decorative />
            </div>

            <div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="text-slate-200">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
