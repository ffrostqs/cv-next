"use client";

import { AppIcon } from "@/icons/AppIcon";
import { Button } from "@/components/ui/button";

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
    <div
      className="
        rounded-3xl p-8
        bg-gradient-to-br from-purple-600/20 to-purple-900/30
        border border-purple-500/30
        backdrop-blur
        flex flex-col
        justify-center
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-600/30 flex items-center justify-center">
          <AppIcon name="download" size={22} decorative />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">{data.title}</h3>
          <p className="text-sm text-purple-200">{data.meta}</p>
        </div>
      </div>

      {/* Content */}
      <ul className="space-y-2 text-slate-200 mb-8">
        {data.features.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-purple-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Action */}
      <Button asChild variant="primary" size="lg" iconLeft="download">
        <a href={data.fileUrl} download>
          {data.downloadLabel}
        </a>
      </Button>
    </div>
  );
}
