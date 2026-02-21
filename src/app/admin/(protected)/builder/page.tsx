import Link from "next/link";
import { getDefaultLocale } from "@/lib/locales";

const BUILDER_SECTIONS = [
  {
    title: "Hero",
    description: "Primary headline, greeting, and CTA labels.",
    href: "/admin/builder/hero",
  },
  {
    title: "About summary",
    description: "Short intro block on the homepage.",
    href: "/admin/builder/about/summary",
  },
  {
    title: "About full",
    description: "Full about section with stats and approach cards.",
    href: "/admin/builder/about/full",
  },
  {
    title: "Resume",
    description: "Resume download card and contact/social details.",
    href: "/admin/builder/resume",
  },
  {
    title: "Footer",
    description: "Footer tagline, navigation, and social links.",
    href: "/admin/builder/footer",
  },
  {
    title: "Legal",
    description: "Terms of service and privacy policy content.",
    href: "/admin/builder/legal",
  },
  {
    title: "Not found",
    description: "404 page copy and CTA.",
    href: "/admin/builder/not-found",
  },
];

export default async function BuilderOverview() {
  const defaultLocale = await getDefaultLocale();
  const localeCode = defaultLocale?.code ?? "de";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--surface-card)]/60 px-5 py-4 text-sm text-[color:var(--text-secondary)]">
        Editing defaults to <span className="text-[color:var(--text-primary)]">{localeCode.toUpperCase()}</span>. Use the locale switcher on each section to update translations.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {BUILDER_SECTIONS.map((section) => (
          <div key={section.href} className="ui-surface-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
              {section.description}
            </p>
            <Link className="ui-link mt-4 inline-flex" href={section.href}>
              Open builder
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
