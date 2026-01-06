import { cn } from "@/components/ui/utils";
import {
  SECTION_BASE,
  SECTION_LAYOUT,
  SECTION_CONTAINER,
  SECTION_BACKGROUND,
  SECTION_BACKGROUND_BASE,
} from "./section.variants";
import type { SectionProps } from "./section.types";
import { SectionGlow } from "@/components/ui/section-glow";

export function Section({
  children,
  id,
  variant = "default",
  glow = false,
  className,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(SECTION_BASE, SECTION_LAYOUT[variant], className)}
      {...rest}
    >
      {/* Base surface */}
      <div
        aria-hidden
        className={cn(SECTION_BACKGROUND_BASE, SECTION_BACKGROUND[variant])}
      />

      {/* Decorative glow */}
      {glow && <SectionGlow />}

      {/* Content */}
      <div className={cn(SECTION_CONTAINER, containerClassName)}>
        {children}
      </div>
    </section>
  );
}
