export const skillsStyles = {
  section: "py-32",

  grid: "grid gap-8 md:grid-cols-2",

  focus: {
    wrapper: "space-y-6 mb-8",
    title: "text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]",
    grid: "grid gap-5 md:grid-cols-3",
    card: `
      relative
      overflow-hidden
      ui-surface-card
      flex items-start gap-4
      rounded-2xl
      p-6
      border border-[color:var(--border-muted)]
      transition-transform
      hover:-translate-y-0.5
    `,
    glow: `
      pointer-events-none
      absolute -inset-8
      opacity-0
      transition-opacity
      group-hover:opacity-100
      bg-[radial-gradient(circle_at_30%_20%,rgba(0,187,255,0.16),transparent_45%)]
    `,
    icon: `
      flex h-10 w-10 shrink-0 items-center justify-center
      rounded-xl
      border border-[color:var(--border-muted)]
      bg-[color:rgba(2,6,23,0.5)]
      text-[color:var(--color-primary)]
    `,
    cardTitle: "text-sm font-semibold text-[color:var(--text-primary)]",
    cardDesc: "text-xs text-[color:var(--text-secondary)] leading-relaxed",
  },

  card: {
    wrapper: `
      ui-surface-card
      flex h-full flex-col gap-6
      rounded-xl
    `,

    header: "flex items-start gap-4",

    iconBox: `
      flex h-9 w-9 shrink-0 items-center justify-center
      rounded-lg
      ui-surface-soft
      text-[color:var(--color-primary)]
    `,

    title: "text-base font-semibold text-[color:var(--text-primary)]",

    description: "text-sm text-[color:var(--text-primary)] opacity-80",

    skills: "flex flex-wrap gap-2",
  },
};
