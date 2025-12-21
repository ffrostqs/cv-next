import type { HTMLAttributes, ReactNode } from "react";

export type SectionVariant = "default" | "hero" | "muted";

export interface SectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  id?: string;
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
}
