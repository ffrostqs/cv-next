"use client";

import { AppIcon } from "@/icons/AppIcon";
import { Button } from "@/components/ui/button";
import { resumeMainCardStyles as s } from "./resume-cards.styles";

interface ResumeCardProps {
  data: {
    title: string;
    meta: string;
    features: string[];
    downloadLabel: string;
    fileUrl: string;
  };
}

export function ResumeCard({ data }: ResumeCardProps) {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.iconBox}>
          <AppIcon name="download" size={22} decorative />
        </div>

        <div>
          <h3 className={s.title}>{data.title}</h3>
          <p className={s.meta}>{data.meta}</p>
        </div>
      </div>

      <ul className={s.list}>
        {data.features.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={s.bullet}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Button asChild variant="primary" size="lg" iconLeft="download">
        <a href={data.fileUrl} download>
          {data.downloadLabel}
        </a>
      </Button>
    </div>
  );
}
