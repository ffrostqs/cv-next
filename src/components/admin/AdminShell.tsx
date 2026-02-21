import type { ReactNode } from "react";
import { getDefaultLocale } from "@/lib/locales";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

export async function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getDefaultLocale();
  const backHref =
    locale?.code === undefined || locale?.isDefault
      ? "/"
      : `/${locale.code}`;

  return <AdminShellClient backHref={backHref}>{children}</AdminShellClient>;
}
