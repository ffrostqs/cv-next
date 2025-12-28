"use client";

import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import type { SocialLinkProps } from "./social-link.types";
import {
  socialLinkStyles,
  socialIconBoxStyles,
  socialLabelStyles,
} from "./social-link.styles";

export function SocialLink({
  icon,
  label,
  variant = "inline",
  className,
  ...props
}: SocialLinkProps) {
  return (
    <a
      {...props}
      className={cn(socialLinkStyles({ variant }), className)}
      aria-label={label}
    >
      <div className={socialIconBoxStyles({ variant })}>
        <AppIcon name={icon} size={variant === "card" ? 24 : 18} decorative />
      </div>

      <span className={socialLabelStyles({ variant })}>{label}</span>
    </a>
  );
}
