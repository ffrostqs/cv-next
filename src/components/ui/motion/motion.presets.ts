import type { MotionProps } from "framer-motion";
import { MOTION_CONFIG } from "./motion.config";

const VIEWPORT = {
  once: true,
  margin: "-100px",
};

const EASE_OUT = "easeOut";

/**
 * Helper: return motion or empty props
 */
function motionOrStatic(props: MotionProps): MotionProps {
  if (!MOTION_CONFIG.enabled) return {};
  return props;
}

export const motionPresets = {
  fadeUp: motionOrStatic({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),

  fadeIn: motionOrStatic({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT,
    transition: {
      duration: 0.4,
      ease: EASE_OUT,
    },
  }),

  fadeLeft: motionOrStatic({
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),

  fadeRight: motionOrStatic({
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),

  scaleIn: motionOrStatic({
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: VIEWPORT,
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
    },
  }),
} satisfies Record<string, MotionProps>;
