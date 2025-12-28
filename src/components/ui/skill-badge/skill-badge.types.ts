export type SkillLevel = "core" | "advanced" | "familiar";

export interface SkillBadgeProps {
  children: string;
  level?: SkillLevel;
  usedIn?: number;
  highlighted?: boolean;
  onClick?: () => void;
  className?: string;
}
