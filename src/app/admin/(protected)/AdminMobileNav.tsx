"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/components/ui/utils";
import { ADMIN_NAV_ITEMS } from "./AdminSidebar";

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border-muted)] px-3 py-1.5 text-xs text-[color:var(--text-primary)]"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
        <span className="text-[color:var(--text-secondary)]">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--surface-card)] shadow-xl">
          <ul className="py-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-white/5 text-[color:var(--color-primary)]"
                        : "text-[color:var(--text-primary)] hover:bg-white/5"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
