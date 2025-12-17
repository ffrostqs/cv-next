import type { ReactNode } from "react";

export type MediaFrameVariant = "default" | "gradient-animated";

export type MediaFrameProps = {
  children: ReactNode;
  variant?: MediaFrameVariant;
  className?: string;
};
