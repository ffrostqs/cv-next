import type { VariantProps } from "class-variance-authority";
import type { mediaFrameWrapperStyles } from "./media-frame.styles";

export interface MediaFrameProps
  extends VariantProps<typeof mediaFrameWrapperStyles> {
  children: React.ReactNode;
  className?: string;
}
