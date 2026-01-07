// src/sections/experience/experience.styles.ts

export const experienceStyles = {
  section: "",

  root: "relative",

  /* ---------------- BACKGROUND ---------------- */

  background: {
    wrapper: "pointer-events-none absolute inset-0 -z-10",

    glowTop: `
      absolute left-1/2 top-[-10%]
      h-[220px] w-[220px]
      -translate-x-1/2
      rounded-full
      opacity-20
      blur-3xl
      bg-gradient-accent

      md:h-[320px] md:w-[320px]
      md:opacity-30
    `,

    glowBottom: `
      absolute left-1/4 bottom-[-10%]
      h-[180px] w-[180px]
      rounded-full
      opacity-15
      blur-3xl
      bg-gradient-accent

      md:h-[260px] md:w-[260px]
      md:opacity-20
    `,
  },

  /* ---------------- TIMELINE ---------------- */

  timeline: {
    wrapper: "relative mt-16 md:mt-24",

    line: `
      hidden
      md:block
      absolute left-1/2 top-0
      h-full w-px
      -translate-x-1/2
      bg-[color:var(--border-muted)]
    `,

    list: "relative flex flex-col gap-12 md:gap-16",

    item: "relative flex",

    iconBase: `
      absolute
      left-0
      top-0
      z-10
      flex
      h-10 w-10
      items-center
      justify-center
      rounded-full
      bg-[color:var(--surface-card)]
      shadow-md

      md:left-1/2
      md:h-12 md:w-12
      md:-translate-x-1/2
    `,

    itemWrapper: `
      relative
      w-full
      pl-14
      md:pl-0
    `,
  },

  /* ---------------- CARD ---------------- */

  card: {
    wrapper: `
      ui-surface-card
      relative
      w-full
      max-w-xl
      overflow-hidden
      transition-all
      duration-300

      md:hover:-translate-y-1
      md:hover:shadow-xl
    `,

    /* -------- Header -------- */

    title: `
    flex
    justify-between
      text-lg
      md:text-xl
      font-semibold
      leading-tight
      text-[color:var(--text-primary)]
    `,

    period: `
      mt-1
      text-xs
      uppercase
      tracking-wide
      text-[color:var(--text-secondary)]
    `,

    /* -------- Body -------- */

    description: `
      mt-4
      md:mt-5
      text-sm
      leading-relaxed
      text-[color:var(--text-secondary)]
    `,

    list: "mt-4 space-y-3",

    listItem: `
      relative
      pl-5
      text-sm
      leading-snug
      text-[color:var(--text-secondary)]
    `,

    bullet: `
      absolute
      left-0
      top-[0.45rem]
      h-1.5
      w-1.5
      rounded-full
      bg-[color:var(--color-primary)]
    `,

    /* -------- Footer -------- */

    stack: `
      mt-6
      pt-4
      border-t
      border-[color:var(--border-muted)]
      text-xs
      font-medium
      text-[color:var(--text-secondary)]
    `,
  },

  /* ---------------- ALIGN ---------------- */

  timelineAlign: {
    left: `
      w-full
      text-left

      md:pr-[calc(50%+2rem)]
    `,

    right: `
      w-full
      text-left

      md:pl-[calc(50%+2rem)]
    `,
  },
};
