import { cn } from "@/utils/cn";
import { getIcon } from "@/icons/lucideNew";
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
  const Icon = getIcon(icon);

  return (
    <a
      {...props}
      className={cn(socialLinkStyles({ variant }), className)}
      aria-label={label}
    >
      <div className={socialIconBoxStyles({ variant })}>
        {Icon && <Icon size={variant === "card" ? 24 : 18} aria-hidden />}
      </div>

      <span className={socialLabelStyles({ variant })}>{label}</span>
    </a>
  );
}
