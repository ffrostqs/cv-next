import { AppIcon } from "@/icons/AppIcon";
import type { FooterLink } from "../footer.types";
import { footerStyles as s } from "../footer.styles";

export function FooterSocials({ links }: { links: FooterLink[] }) {
  return (
    <div className={s.socials}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={link.label}
          className={s.socialLink}
        >
          {link.icon && <AppIcon name={link.icon} size={18} decorative />}
        </a>
      ))}
    </div>
  );
}
