import { motionPresets } from "./motion.presets";
import type { MotionProps } from "framer-motion";

export function withDelay(
  preset: keyof typeof motionPresets,
  delay: number
): MotionProps {
  const base = motionPresets[preset];

  if (!base.transition) return base;

  return {
    ...base,
    transition: {
      ...base.transition,
      delay,
    },
  };
}
