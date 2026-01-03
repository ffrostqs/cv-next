// src/components/header/header.styles.ts

export const headerStyles = {
  root: "fixed top-0 left-0 right-0 z-50",

  bar: `
    relative
    supports-[backdrop-filter]:backdrop-blur-lg
    border-b border-slate-200 dark:border-slate-800
    shadow-lg
  `,

  container: "container mx-auto px-4",

  inner: "flex h-20 items-center justify-between",

  mobileActions: "flex lg:hidden items-center gap-2 ",

  mobileButton: `
    w-10 h-10 flex items-center justify-center
    rounded-lg
    text-slate-700 dark:text-slate-300
    animate-surface-gradient bg-gradient-accent
    
  `,
};
