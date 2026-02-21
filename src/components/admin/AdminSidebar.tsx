"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";
import type { IconName } from "@/icons/icon.types";

export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: "laptop" as IconName },
  { href: "/admin/builder", label: "Site Builder", icon: "architecture" as IconName },
  { href: "/admin/header", label: "Header", icon: "menu" as IconName },
  { href: "/admin/posts", label: "Posts", icon: "category" as IconName },
  { href: "/admin/pages", label: "Pages", icon: "about" as IconName },
  { href: "/admin/projects", label: "Projects", icon: "projects" as IconName },
  { href: "/admin/skills", label: "Skills", icon: "skills" as IconName },
  { href: "/admin/experience", label: "Experience", icon: "experience" as IconName },
  { href: "/admin/settings", label: "Settings", icon: "tools" as IconName },
];

export function AdminSidebar({
  collapsed = false,
  onToggle,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col border-r border-white/10 bg-[color:var(--surface-card)]/70 backdrop-blur-xl transition-all duration-200",
        collapsed ? "md:w-14 lg:w-14" : "md:w-64 lg:w-72"
      )}
    >
      <div
        className={cn(
          "flex items-start justify-between gap-3",
          collapsed ? "px-3 py-4" : "px-6 py-6"
        )}
      >
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          {!collapsed ? (
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
                Admin
              </p>
              <h1 className="mt-1 text-xl font-semibold">Content Studio</h1>
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <AppIcon name="logo" size={18} decorative />
            </div>
          )}
        </div>
        <div className="h-8 w-8" />
      </div>

      <nav className={cn("flex-1 pb-6", collapsed ? "px-2" : "px-3")}>
        <ul className={cn("space-y-1", collapsed ? "pt-2" : "")}>
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
                    "group relative flex items-center gap-3 rounded-xl py-2 text-sm transition-colors",
                    isActive
                      ? "bg-white/10 text-[color:var(--color-primary)] ring-1 ring-cyan-200/40"
                      : "text-[color:var(--text-primary)] hover:bg-white/5 hover:text-[color:var(--color-primary)]",
                    collapsed ? "justify-center px-0 h-10" : "px-4"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <AppIcon name={item.icon} size={collapsed ? 18 : 18} decorative />
                  {!collapsed ? <span>{item.label}</span> : null}
                  {collapsed ? (
                    <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[color:var(--surface-card)]/90 px-3 py-1 text-xs text-[color:var(--text-primary)] shadow-lg backdrop-blur-sm group-hover:block">
                      {item.label}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {onToggle ? (
        <div
          className={cn(
            "mt-auto border-t border-white/10 bg-[color:var(--surface-card)]/90 backdrop-blur-xl",
            "sticky bottom-0",
            collapsed ? "px-2 py-3" : "px-4 py-4"
          )}
        >
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "group relative w-full rounded-xl border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] hover:border-white/20",
              collapsed
                ? "h-10 flex items-center justify-center"
                : "px-3 py-2.5 flex items-center justify-center gap-2"
            )}
            aria-label={collapsed ? "Expand studio menu" : "Collapse studio menu"}
          >
            {collapsed ? (
              <>
                <AppIcon name="menu" size={16} decorative />
                <span className="sr-only">Show studio</span>
                <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[color:var(--surface-card)]/90 px-3 py-1 text-xs text-[color:var(--text-primary)] shadow-lg backdrop-blur-sm group-hover:block">
                  Show studio
                </span>
              </>
            ) : (
              <>
                <AppIcon name="close" size={12} decorative />
                Hide studio
              </>
            )}
          </button>
        </div>
      ) : null}
    </aside>
  );
}
