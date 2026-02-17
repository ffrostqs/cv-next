import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n";
import { getAllLocales } from "@/lib/locales";
import { updateGlobalSection } from "@/lib/admin-actions";
import { LocaleSwitch } from "../LocaleSwitch";
import { AdminMenuTable } from "./AdminMenuTable";

export default async function HeaderAdmin({
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

  const dictionary = await getDictionary(activeLocale?.code ?? "de");
  const fallbackGlobal = dictionary.global;

  const globalSection = await prisma.siteSection.findUnique({
    where: { key: "global" },
    include: {
      content: {
        where: { localeId: activeLocale?.id },
      },
    },
  });

  const globalData =
    (globalSection?.content[0]?.data as { name?: string; goHome?: string }) ??
    fallbackGlobal;

  const menu = await prisma.menu.findUnique({
    where: { key: "main" },
    include: {
      items: {
        orderBy: { order: "asc" },
        include: {
          labels: { where: { localeId: activeLocale?.id } },
          parent: {
            include: {
              labels: { where: { localeId: activeLocale?.id } },
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Header
          </p>
          <h2 className="text-2xl font-semibold">Navigation & brand</h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Editing language:{" "}
            <span className="text-[color:var(--text-primary)]">
              {activeLocale?.name ?? "German"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitch
            value={activeLocale?.code ?? "de"}
            options={locales.map((locale) => ({
              code: locale.code,
              name: locale.name,
            }))}
          />
          <Link className="ui-link" href="/admin">
            Back
          </Link>
        </div>
      </div>

      <form
        action={updateGlobalSection}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Site name</span>
          <input
            name="name"
            required
            defaultValue={globalData?.name ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Go home label</span>
          <input
            name="goHome"
            required
            defaultValue={globalData?.goHome ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save header text
          </button>
        </div>
      </form>

      <div className="ui-surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
              Menu
            </p>
            <h3 className="text-xl font-semibold">Main navigation</h3>
          </div>
          <Link
            className="ui-link"
            href={`/admin/header/menu/new?locale=${activeLocale?.code ?? "de"}`}
          >
            Add menu item
          </Link>
        </div>

        {menu?.items?.length ? (
          <AdminMenuTable
            items={menu.items.map((item) => ({
              id: item.id,
              label: item.labels[0]?.label ?? "Untitled",
              href: item.href,
              parentLabel: item.parent?.labels[0]?.label ?? "—",
              order: item.order,
              isActiveGlobal: item.isActiveGlobal,
              isActiveLocale: item.labels[0]?.isActive ?? false,
              editHref: `/admin/header/menu/${item.id}/edit?locale=${
                activeLocale?.code ?? "de"
              }`,
            }))}
            localeCode={activeLocale?.code ?? "de"}
          />
        ) : (
          <div className="rounded-xl border border-[color:var(--border-muted)] px-4 py-6 text-sm text-[color:var(--text-secondary)]">
            No menu items yet.
          </div>
        )}
      </div>
    </div>
  );
}
