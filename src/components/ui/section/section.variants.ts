export const SECTION_BASE = "relative flex items-center justify-center";

export const SECTION_CONTAINER =
  "container mx-auto max-w-6xl px-5 sm:px-6 lg:px-8";

export const SECTION_LAYOUT = {
  default: "py-28 sm:py-32",
  hero: "min-h-screen py-32 sm:py-36",
  muted: "py-28 sm:py-32",
} as const;

/** Background surface positioning */
export const SECTION_BACKGROUND_BASE = "absolute inset-0 -z-20";

/** Semantic surfaces only */
export const SECTION_BACKGROUND = {
  default: "ui-surface-default ui-surface-radial",
  hero: "ui-surface-hero",
  muted: "ui-surface-muted",
} as const;
