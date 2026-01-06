export const skillsStyles = {
  section: "py-32",

  grid: "grid gap-8 md:grid-cols-2",

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

    title: "text-base font-semibold",

    description: "ui-text-muted text-sm",

    skills: "flex flex-wrap gap-2",
  },
};
