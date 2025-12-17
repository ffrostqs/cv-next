import { cn } from "@/utils/cn";
import { SocialLink } from "@/components/ui/social-link";
import type { SocialLinksProps } from "./social-links.types";
import { socialLinksWrapperStyles } from "./social-links.styles";

export function SocialLinks({
  items,
  variant = "inline",
  className,
}: SocialLinksProps) {
  return (
    <div className={cn(socialLinksWrapperStyles({ variant }), className)}>
      {items.map((item) => (
        <SocialLink
          key={item.label}
          href={item.href}
          icon={item.icon}
          label={item.label}
          variant={variant}
          target="_blank"
          rel="noopener noreferrer"
        />
      ))}
    </div>
  );
}
