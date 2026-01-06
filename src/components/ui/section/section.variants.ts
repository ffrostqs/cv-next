export const SECTION_BASE = "relative flex items-center justify-center";

export const SECTION_CONTAINER = "container mx-auto max-w-6xl px-4";

export const SECTION_LAYOUT = {
  default: "py-24",
  hero: "min-h-screen py-32",
  muted: "py-24",
} as const;

/** Background surface positioning */
export const SECTION_BACKGROUND_BASE = "absolute inset-0 -z-20";

/** Semantic surfaces only */
export const SECTION_BACKGROUND = {
  default: "ui-surface-default ui-surface-radial",
  hero: "ui-surface-hero",
  muted: "ui-surface-muted",
} as const;
