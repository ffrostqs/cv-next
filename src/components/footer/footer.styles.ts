export const footerStyles = {
  wrapper: `
  p-8
  `,

  container: `
    max-w-7xl
    mx-auto
    px-4
    py-16
    space-y-12
    text-center
  `,

  tagline: `
    text-lg
    font-medium
    ui-text
    max-w-xl
    mx-auto
  `,

  grid: `
    grid
    gap-12
    md:grid-cols-2
    justify-items-center
  `,

  /* navigation */
  navList: `
    space-y-2
    text-left
  `,

  navLink: `
    text-sm
    ui-text-muted
    transition-colors
    hover:text-[color:var(--color-primary)]
  `,

  /* socials */
  socials: "flex justify-center gap-6",

  socialLink: `
    ui-text-muted
    transition-colors
    hover:text-[color:var(--color-primary)]
  `,

  /* meta */
  meta: `
    border-t
    ui-border
    mt-12
    pt-6
    text-xs
    ui-text-muted
    flex
    flex-col
    sm:flex-row
    justify-center
    items-center
    gap-4
    text-center
  `,
};
