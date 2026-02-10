export const projectsStyles = {
  section: "relative",

  root: "space-y-14",

  tabsWrapper: "flex justify-center",

  grid: "grid gap-8 sm:grid-cols-2",
  showMore: "flex justify-center pt-4",
  filterBar: `
    flex flex-wrap items-center justify-center gap-2
    text-sm
    text-[color:var(--text-secondary)]
  `,
  filterLabel: "opacity-70",
  filterValue: `
    rounded-full
    px-3 py-1
    text-[color:var(--text-primary)]
    bg-[color:rgba(0,187,255,0.12)]
  `,

  card: {
    wrapper: `
      ui-surface-card
      flex h-full flex-col
      rounded-xl
      p-7
      transition-colors
      hover:border-[color:var(--color-primary)]
    `,

    header: "flex items-start justify-between gap-4",

    title: "text-base font-semibold leading-tight",

    meta: `
      ui-surface-soft
      ui-text-muted
      rounded-md
      px-2 py-0.5
      text-xs
    `,

    description: `
      ui-text-muted
      mt-4
      text-sm
      leading-relaxed
    `,
    impact: "mt-4 flex flex-wrap gap-2.5",
    impactItem: `
      rounded-full
      border
      border-[color:var(--border-muted)]
      bg-[color:rgba(0,187,255,0.12)]
      px-3.5 py-1
      text-xs
      text-[color:var(--text-primary)]
    `,

    imageWrapper: `
      ui-surface-soft
      relative
      mt-5
      aspect-video
      overflow-hidden
      rounded-lg
    `,

    image: "object-cover",

    stack: "mt-5 flex flex-wrap gap-2.5",

    stackItem: `
      rounded-md
      px-2.5 py-1
      text-sm
      text-[color:var(--text-primary)]
      bg-[color:rgba(148,163,184,0.16)]
      border
      border-[color:var(--border-muted)]
    `,

    links: "mt-6 flex flex-wrap gap-4",

    link: `
      inline-flex
      items-center
      gap-1.5
      text-xs
      font-medium
      text-[color:var(--color-primary)]
      hover:underline
    `,
    case: "mt-6",
    caseToggle: `
      inline-flex
      items-center
      gap-2
      text-xs
      font-medium
      text-[color:var(--color-primary)]
      hover:underline
    `,
    caseBody: `
      mt-4
      space-y-4
      text-sm
      text-[color:var(--text-primary)]
    `,
    caseLabel: "text-xs uppercase tracking-wide opacity-60",
  },
};
