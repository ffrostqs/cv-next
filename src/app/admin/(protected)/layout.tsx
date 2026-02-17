import { requireAdmin } from "@/lib/require-admin";
import Link from "next/link";
import { getDefaultLocale } from "@/lib/locales";
import { LogoutButton } from "./LogoutButton";
import { AdminSidebar } from "./AdminSidebar";
import { AdminMobileNav } from "./AdminMobileNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const locale = await getDefaultLocale();
  const backHref =
    locale?.code === undefined || locale?.isDefault
      ? "/"
      : `/${locale.code}`;

  return (
    <div className="min-h-screen bg-[color:var(--surface-page)] text-[color:var(--text-primary)]">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-[color:var(--border-muted)] px-6 md:px-8">
            <div className="flex items-center gap-3 text-sm text-[color:var(--text-secondary)]">
              <AdminMobileNav />
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
  );
}
