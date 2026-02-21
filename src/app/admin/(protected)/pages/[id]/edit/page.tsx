import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updatePage } from "@/lib/admin-actions";
import { notFound } from "next/navigation";
import { getAllLocales } from "@/lib/locales";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ locale?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearchParams?.locale) ??
    defaultLocale;

  const translation = activeLocale
    ? await prisma.pageTranslation.findUnique({
        where: {
          pageId_localeId: {
            pageId: id,
            localeId: activeLocale.id,
          },
        },
      })
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Pages
          </p>
          <h2 className="text-2xl font-semibold">Edit page</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link className="ui-link" href={`/admin/pages/${page.id}/builder`}>
            Open builder
          </Link>
          <Link className="ui-link" href="/admin/pages">
            Back
          </Link>
        </div>
      </div>

      <form
        action={updatePage.bind(null, page.id)}
        className="ui-surface-card p-6 rounded-2xl space-y-5"
      >
        <label className="block">
          <span className="text-sm">Language</span>
          <input type="hidden" name="locale" value={activeLocale?.code} />
          <LocaleSwitch
            value={activeLocale?.code ?? "de"}
            options={locales.map((locale) => ({
              code: locale.code,
              name: locale.name,
            }))}
          />
        </label>
        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            defaultValue={translation?.title ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Slug</span>
          <input
            name="slug"
            defaultValue={translation?.slug ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Content (Markdown)</span>
          <textarea
            name="content"
            rows={14}
            required
            defaultValue={translation?.content ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={translation?.published ?? false}
          />
          Publish
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save changes
          </button>
          <Link className="ui-link" href="/admin/pages">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
