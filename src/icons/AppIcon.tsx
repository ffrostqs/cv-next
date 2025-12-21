import { ICONS } from "./icon-registry";
import type { IconName } from "./icon.types";
import type { LucideProps } from "lucide-react";

interface AppIconProps extends LucideProps {
  name: IconName;
  decorative?: boolean;
}

export function AppIcon({ name, decorative = true, ...props }: AppIconProps) {
  const Icon = ICONS[name];

  if (!Icon) return null;

  return <Icon aria-hidden={decorative} focusable={false} {...props} />;
}
