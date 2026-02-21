"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { AdminLayoutProvider } from "@/components/admin/AdminLayoutContext";
import { AppIcon } from "@/icons/AppIcon";

const STORAGE_KEY = "admin:studio-collapsed";

export function AdminShellClient({
  children,
  backHref,
}: {
  children: ReactNode;
  backHref: string;
}) {
  const [studioCollapsed, setStudioCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setStudioCollapsed(stored === "true");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(studioCollapsed));
  }, [studioCollapsed]);

  const toggleStudio = useCallback(() => {
    setStudioCollapsed((value) => !value);
  }, []);

  const layoutValue = useMemo(
    () => ({ studioCollapsed, toggleStudio, setStudioCollapsed }),
    [studioCollapsed, toggleStudio, setStudioCollapsed]
  );

  return (
    <AdminLayoutProvider value={layoutValue}>
      <div className="min-h-screen bg-[color:var(--surface-page)] text-[color:var(--text-primary)]">
        <div className="relative flex min-h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_15%_-10%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(900px_520px_at_85%_-20%,rgba(99,102,241,0.12),transparent_60%)]" />
          <AdminSidebar collapsed={studioCollapsed} onToggle={toggleStudio} />

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[color:var(--surface-card)]/70 px-6 backdrop-blur-xl md:px-8">
              <div className="flex items-center gap-3 text-sm text-[color:var(--text-secondary)]">
                <AdminMobileNav />
                <button
                  type="button"
                  onClick={toggleStudio}
                  className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[color:var(--text-secondary)] hover:border-white/20"
                  aria-label={studioCollapsed ? "Show studio menu" : "Hide studio menu"}
                  title={studioCollapsed ? "Show studio menu" : "Hide studio menu"}
                >
                  <AppIcon name={studioCollapsed ? "menu" : "close"} size={16} decorative />
                </button>
                <span className="hidden sm:inline">Admin</span>
                <span className="hidden sm:inline">/</span>
                <span className="hidden sm:inline text-[color:var(--text-primary)]">
                  Content Studio
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <Link className="ui-link" href={backHref}>
                  Back to site
                </Link>
                <LogoutButton />
              </div>
            </header>

            <main className="px-6 py-8 md:px-10 md:py-10">{children}</main>
          </div>
        </div>
      </div>
    </AdminLayoutProvider>
  );
}
