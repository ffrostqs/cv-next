import type { StatCardProps } from "../stat-card";

export type GridColumns = 1 | 2 | 3 | 4;

export interface StatListColumns {
  base?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
}

export interface StatListProps {
  items: StatCardProps[];
  columns?: StatListColumns;
  className?: string;
}
