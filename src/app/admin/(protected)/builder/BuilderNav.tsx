"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/utils";

const BUILDER_NAV_ITEMS = [
  { href: "/admin/builder", label: "Overview" },
  { href: "/admin/builder/hero", label: "Hero" },
  { href: "/admin/builder/about/summary", label: "About summary" },
  { href: "/admin/builder/about/full", label: "About full" },
  { href: "/admin/builder/resume", label: "Resume" },
  { href: "/admin/builder/footer", label: "Footer" },
  { href: "/admin/builder/legal", label: "Legal" },
  { href: "/admin/builder/not-found", label: "Not found" },
];

export function BuilderNav() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--surface-card)]/70 px-4 py-3">
      <ul className="flex flex-wrap gap-2 text-sm">
        {BUILDER_NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin/builder"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-1.5 transition-colors",
                  isActive
                    ? "border-transparent bg-white/10 text-[color:var(--color-primary)]"
                    : "border-[color:var(--border-muted)] text-[color:var(--text-primary)] hover:bg-white/5"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
