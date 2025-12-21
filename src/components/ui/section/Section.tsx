import { cn } from "@/components/ui/utils";
import { SECTION_LAYOUT, SECTION_BACKGROUND } from "./section.variants";
import type { SectionProps } from "./section.types";

export function Section({
  children,
  id,
  variant = "default",
  className,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex items-center justify-center px-4",
        SECTION_LAYOUT[variant],
        className
      )}
      {...rest}
    >
      {/* Background */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 animate-surface-gradient",
          SECTION_BACKGROUND[variant]
        )}
      />

      {/* Content */}
      <div className={cn("container mx-auto max-w-6xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
