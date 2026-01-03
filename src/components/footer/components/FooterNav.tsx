import type { FooterLink } from "../footer.types";

export function FooterNav({ links }: { links: FooterLink[] }) {
  return (
    <nav aria-label="Footer navigation">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
