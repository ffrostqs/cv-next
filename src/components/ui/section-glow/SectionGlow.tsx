"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/ui/utils";

export interface SectionGlowProps {
  className?: string;
}

export function SectionGlow({ className }: SectionGlowProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-20", className)}
    >
      {/* Top glow */}
      <motion.div
        className="
          absolute left-10/12 top-[-20%]
          h-[360px] w-[360px]
          -translate-x-1/2
          rounded-full
          bg-gradient-accent
          blur-3xl
        "
        animate={{
          y: [-40, 0, -40],
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Bottom glow */}
      <motion.div
        className="
          absolute left-1/4 bottom-[-20%]
          h-[300px] w-[300px]
          rounded-full
          bg-gradient-accent
          blur-3xl
        "
        animate={{
          y: [30, 0, 30],
          scale: [1, 1.05, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
