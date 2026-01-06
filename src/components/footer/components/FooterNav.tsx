import type { FooterLink } from "../footer.types";
import { footerStyles as s } from "../footer.styles";

export function FooterNav({ links }: { links: FooterLink[] }) {
  return (
    <nav aria-label="Footer navigation">
      <ul className={s.navList}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={s.navLink}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
