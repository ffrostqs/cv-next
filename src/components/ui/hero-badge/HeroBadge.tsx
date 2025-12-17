import { cn } from "@/utils/cn";
import type { HeroBadgeProps } from "./hero-badge.types";
import { heroBadgeStyles, heroBadgeDotStyles } from "./hero-badge.styles";

export function HeroBadge({ status, title, subtitle }: HeroBadgeProps) {
  return (
    <div className={cn(heroBadgeStyles({ status }))}>
      <span className={heroBadgeDotStyles({ status })} aria-hidden />

      <div>
        <div className="text-slate-900 dark:text-white">{title}</div>

        {subtitle && (
          <div className="text-slate-500 dark:text-slate-400">{subtitle}</div>
        )}
      </div>
    </div>
  );
}
