export type HeroStatus = "available" | "busy" | "offline";

export interface HeroBadgeProps {
  status: HeroStatus;
  title: string;
  subtitle?: string;
}
