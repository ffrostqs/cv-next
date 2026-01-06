export const projectsStyles = {
  section: "relative",

  root: "space-y-12",

  tabsWrapper: "flex justify-center",

  grid: "grid gap-6 sm:grid-cols-2",

  card: {
    wrapper: `
      ui-surface-card
      flex h-full flex-col
      rounded-xl
      p-6
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
      mt-3
      text-sm
      leading-relaxed
    `,

    imageWrapper: `
      ui-surface-soft
      relative
      mt-4
      aspect-video
      overflow-hidden
      rounded-lg
    `,

    image: "object-cover",

    stack: "mt-4 flex flex-wrap gap-2",

    stackItem: `
      ui-surface-soft
      ui-text-muted
      rounded-md
      px-2 py-0.5
      text-xs
    `,

    links: "mt-6 flex gap-4",

    link: `
      inline-flex
      items-center
      gap-1.5
      text-xs
      font-medium
      text-[color:var(--color-primary)]
      hover:underline
    `,
  },
};
