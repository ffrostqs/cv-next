import type { ReactNode, HTMLAttributes } from "react";

export type SectionVariant = "default" | "hero" | "muted";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  variant?: SectionVariant;
  children: ReactNode;
  className?: string;
  containerClassName?: string;

  /** Decorative animated glow */
  glow?: boolean;
}
