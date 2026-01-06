// src/sections/resume/components/resume-cards.styles.ts

export const resumeCardBase = {
  wrapper: `
    ui-surface-card
    rounded-xl
  `,
};

export const contactCardStyles = {
  wrapper: `
    ui-surface-card
    rounded-xl
    p-6
  `,

  title: "text-base font-semibold mb-4",

  list: "space-y-4",

  item: "flex items-start gap-3",

  iconBox: `
    ui-surface-soft
    flex h-9 w-9 shrink-0 items-center justify-center
    rounded-lg
    text-[color:var(--color-primary)]
  `,

  label: "text-sm ui-text-muted",

  value: "ui-text",
};

export const socialCardStyles = {
  wrapper: `
    ui-surface-card
    rounded-xl
    p-6
  `,

  title: "text-base font-semibold mb-4",

  grid: "grid grid-cols-6 gap-3",
};

export const resumeMainCardStyles = {
  wrapper: `
    ui-surface-card
    rounded-xl
    p-8
    flex flex-col justify-center
  `,

  header: "flex items-center gap-4 mb-6",

  iconBox: `
    ui-surface-soft
    flex h-12 w-12 items-center justify-center
    rounded-xl
    text-[color:var(--color-primary)]
  `,

  title: "text-lg font-semibold",

  meta: "text-sm ui-text-muted",

  list: "space-y-2 ui-text mb-8",

  bullet: "text-[color:var(--color-primary)]",
};
