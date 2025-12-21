import type { SectionVariant } from "./section.types";

/* Layout classes — ВПЛИВАЮТЬ НА РОЗМІР СЕКЦІЇ */
export const SECTION_LAYOUT: Record<SectionVariant, string> = {
  default: "py-24",
  hero: "min-h-screen pt-24",
  muted: "py-24",
};

/* Background classes — ТІЛЬКИ ВІЗУАЛ */
export const SECTION_BACKGROUND: Record<SectionVariant, string> = {
  default: `
    bg-gradient-to-br
    from-[var(--surface-gradient-from)]
    via-[var(--surface-gradient-via)]
    to-[var(--surface-gradient-to)]
  `,
  hero: `
    bg-gradient-to-br
    from-[var(--surface-gradient-from)]
    via-[var(--surface-gradient-via)]
    to-[var(--surface-gradient-to)]
  `,
  muted: "bg-slate-50 dark:bg-slate-900",
};
