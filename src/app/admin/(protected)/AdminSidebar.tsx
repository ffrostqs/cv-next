"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/utils";

export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/header", label: "Header" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 border-r border-[color:var(--border-muted)] bg-[color:var(--surface-card)]/70 backdrop-blur">
      <div className="px-6 py-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
          Admin
        </p>
        <h1 className="mt-1 text-xl font-semibold">Content Studio</h1>
      </div>

      <nav className="flex-1 px-3 pb-6">
        <ul className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-white/5 text-[color:var(--color-primary)]"
                      : "text-[color:var(--text-primary)] hover:bg-white/5 hover:text-[color:var(--color-primary)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 transition-opacity group-hover:opacity-100" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
