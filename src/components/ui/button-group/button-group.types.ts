import type { ReactNode } from "react";

export type ButtonGroupVariant = "horizontal" | "vertical";

export interface ButtonGroupProps {
  children: ReactNode;
  variant?: ButtonGroupVariant;
  className?: string;
}
