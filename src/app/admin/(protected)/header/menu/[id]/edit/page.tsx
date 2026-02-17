import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAllLocales } from "@/lib/locales";
import { updateMenuItem, deleteMenuItem } from "@/lib/admin-actions";
import { LocaleSwitch } from "../../../../LocaleSwitch";

export default async function EditMenuItem({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ locale?: string }>;
}) {
  const { id } = await params;
  const resolvedSearch = (await searchParams) ?? {};

  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) notFound();

  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearch.locale) ??
    defaultLocale;

  const translation = await prisma.menuItemTranslation.findUnique({
    where: {
      menuItemId_localeId: {
        menuItemId: id,
        localeId: activeLocale?.id ?? defaultLocale.id,
      },
    },
  });

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
          <h2 className="text-2xl font-semibold">Edit menu item</h2>
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
        action={updateMenuItem.bind(null, item.id)}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Label</span>
          <input
            name="label"
            required
            defaultValue={translation?.label ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Href</span>
          <input
            name="href"
            required
            defaultValue={item.href}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Parent</span>
          <select
            name="parentId"
            defaultValue={item.parentId ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          >
            <option value="">No parent</option>
            {menu?.items
              ?.filter((menuItem) => menuItem.id !== item.id)
              .map((menuItem) => (
                <option key={menuItem.id} value={menuItem.id}>
                  {menuItem.labels[0]?.label ?? menuItem.href}
                </option>
              ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Order</span>
          <input
            name="order"
            type="number"
            defaultValue={item.order}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save changes
          </button>
          <Link className="ui-link" href="/admin/header">
            Cancel
          </Link>
        </div>
      </form>

      <form
        action={async () => {
          "use server";
          await deleteMenuItem(item.id);
        }}
        className="ui-surface-card rounded-2xl p-6"
      >
        <p className="text-sm text-[color:var(--text-secondary)]">
          Deleting this item removes it from the menu for all languages.
        </p>
        <button className="ui-link mt-3" type="submit">
          Delete menu item
        </button>
      </form>
    </div>
  );
}
