"use client";

import { SocialLink } from "@/components/ui/social-link";
import type { IconName } from "@/icons/icon.types";

interface SocialCardProps {
  data: {
    title: string;
    items: {
      icon: IconName;
      label: string;
      url: string;
    }[];
  };
}

export function SocialCard({ data }: SocialCardProps) {
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

      <ul className="grid grid-cols-6 gap-3">
        {data.items.map((item) => (
          <li key={item.url}>
            <SocialLink
              icon={item.icon}
              label={item.label}
              href={item.url}
              target="_blank"
              variant="card"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
