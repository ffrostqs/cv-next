import type { MotionProps } from "framer-motion";
import { motionPresets } from "./motion.presets";

type MotionOptions = {
  delay?: number;
  order?: number;
  step?: number;
};

export function motion(
  preset: keyof typeof motionPresets,
  options: MotionOptions = {}
): MotionProps {
  const base = motionPresets[preset];
  if (!base.transition) return base;

  const { delay = 0, order, step = 0.08 } = options;

  const computedDelay = order !== undefined ? order * step : delay;

  return {
    ...base,
    transition: {
      ...base.transition,
      delay: computedDelay,
    },
  };
}
