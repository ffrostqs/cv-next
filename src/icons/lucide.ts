import * as Icons from "lucide-react";

// fallback іконка
export const FallbackIcon = Icons.HelpCircle;

// автоматична мапа (всі іконки доступні)
export const iconMap = Icons;

// типізація: дозволяє TS підказувати імена іконок
export type IconName = keyof typeof Icons;

// утиліта
export function getIcon(name: string) {
  return iconMap[name as IconName] || FallbackIcon;
}
