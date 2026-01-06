"use client";

import { SocialLink } from "@/components/ui/social-link";
import type { IconName } from "@/icons/icon.types";
import { socialCardStyles as s } from "./resume-cards.styles";

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
    <div className={s.wrapper}>
      <h3 className={s.title}>{data.title}</h3>

      <ul className={s.grid}>
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
