import Link from "next/link";
import { createMenuItem } from "@/lib/admin-actions";
import { getAllLocales } from "@/lib/locales";
import { prisma } from "@/lib/prisma";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";

export default async function NewMenuItem({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>;
}) {
  const resolvedSearch = (await searchParams) ?? {};
  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearch.locale) ??
    defaultLocale;
  const menu = await prisma.menu.findUnique({
    where: { key: "main" },
    include: {
      items: {
        orderBy: { order: "asc" },
        include: { labels: { where: { localeId: activeLocale?.id } } },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Header
          </p>
          <h2 className="text-2xl font-semibold">New menu item</h2>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitch
            value={activeLocale?.code ?? "de"}
            options={locales.map((locale) => ({
              code: locale.code,
              name: locale.name,
            }))}
          />
          <Link className="ui-link" href="/admin/header">
            Back
          </Link>
        </div>
      </div>

      <form
        action={createMenuItem}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Label</span>
          <input
            name="label"
            required
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Href</span>
          <input
            name="href"
            placeholder="#projects or /blog"
            required
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Parent</span>
          <select
            name="parentId"
            defaultValue=""
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          >
            <option value="">No parent</option>
            {menu?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.labels[0]?.label ?? item.href}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Order</span>
          <input
            name="order"
            type="number"
            defaultValue={0}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save menu item
          </button>
          <Link className="ui-link" href="/admin/header">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
