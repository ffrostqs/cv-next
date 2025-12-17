import { cn } from "@/components/ui/utils";
import type { SectionProps } from "./section.types";

const VARIANTS = {
  default: `
    bg-gradient-to-br
    from-[var(--surface-gradient-from)]
    via-[var(--surface-gradient-via)]
    to-[var(--surface-gradient-to)]
  `,
  hero: `
    bg-gradient-to-br
    from-[var(--surface-gradient-from)]
    via-[var(--surface-gradient-via)]
    to-[var(--surface-gradient-to)]
  `,
  muted: `
    bg-slate-50 dark:bg-slate-900
  `,
};

export function Section({
  children,
  id,
  variant = "default",
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 -z-10 animate-surface-gradient",
          VARIANTS[variant]
        )}
        aria-hidden
      />
      <div className={cn("container mx-auto max-w-6xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
