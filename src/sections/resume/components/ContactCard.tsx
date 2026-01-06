"use client";

import { AppIcon } from "@/icons/AppIcon";
import type { IconName } from "@/icons/icon.types";
import { contactCardStyles as s } from "./resume-cards.styles";

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
    <div className={s.wrapper}>
      <h3 className={s.title}>{data.title}</h3>

      <ul className={s.list}>
        {data.items.map((item) => (
          <li key={item.label} className={s.item}>
            <div className={s.iconBox}>
              <AppIcon name={item.icon} size={16} decorative />
            </div>

            <div>
              <p className={s.label}>{item.label}</p>
              <p className={s.value}>{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
