"use client";

import { cn } from "@/components/ui/utils";
import type { MediaFrameProps } from "./media-frame.types";
import {
  mediaFrameWrapperStyles,
  mediaFrameInnerStyles,
} from "./media-frame.styles";

export function MediaFrame({ children, variant, className }: MediaFrameProps) {
  return (
    <div className={cn(mediaFrameWrapperStyles({ variant }), className)}>
      <div className={mediaFrameInnerStyles()}>{children}</div>
    </div>
  );
}
