import { AppIcon } from "@/icons/AppIcon";
import type { FooterLink } from "../footer.types";

export function FooterSocials({ links }: { links: FooterLink[] }) {
  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={link.label}
          className="text-slate-400 hover:text-white transition"
        >
          {link.icon && <AppIcon name={link.icon} size={18} decorative />}
        </a>
      ))}
    </div>
  );
}
