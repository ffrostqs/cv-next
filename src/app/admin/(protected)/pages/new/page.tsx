import Link from "next/link";
import { createPage } from "@/lib/admin-actions";
import { getAllLocales } from "@/lib/locales";

export default async function NewPage() {
  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Pages
          </p>
          <h2 className="text-2xl font-semibold">New page</h2>
        </div>
        <Link className="ui-link" href="/admin/pages">
          Back
        </Link>
      </div>

      <form action={createPage} className="ui-surface-card p-6 rounded-2xl space-y-5">
        <label className="block">
          <span className="text-sm">Language</span>
          <select
            name="locale"
            defaultValue={defaultLocale?.code}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          >
            {locales.map((locale) => (
              <option key={locale.code} value={locale.code}>
                {locale.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Slug</span>
          <input
            name="slug"
            placeholder="optional"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Content (Markdown)</span>
          <textarea
            name="content"
            rows={14}
            required
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" /> Publish now
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save page
          </button>
          <Link className="ui-link" href="/admin/pages">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
