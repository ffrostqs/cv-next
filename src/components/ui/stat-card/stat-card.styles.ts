// src/components/ui/stat-card/stat-card.styles.ts

import { cva } from "class-variance-authority";

export const statCardStyles = cva("ui-surface-card flex flex-col items-start");

export const statCardIcon = "mb-3 text-[color:var(--color-primary)]";

export const statCardValue =
  "text-3xl font-semibold text-[color:var(--text-primary)]";

export const statCardLabel =
  "mt-1 text-sm font-medium text-[color:var(--text-secondary)]";

export const statCardDescription =
  "mt-2 text-sm text-[color:var(--text-secondary)]";
