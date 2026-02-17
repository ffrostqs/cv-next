import Link from "next/link";
import { createProject } from "@/lib/admin-actions";
import { getAllLocales } from "@/lib/locales";

export default async function NewProject() {
  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Projects
          </p>
          <h2 className="text-2xl font-semibold">New project</h2>
        </div>
        <Link className="ui-link" href="/admin/projects">
          Back
        </Link>
      </div>

      <form action={createProject} className="ui-surface-card p-6 rounded-2xl space-y-5">
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
          <span className="text-sm">Category</span>
          <input
            name="category"
            required
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Meta</span>
          <input
            name="meta"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={3}
            required
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Problem</span>
          <textarea
            name="problem"
            rows={2}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Solution</span>
          <textarea
            name="solution"
            rows={2}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Result</span>
          <textarea
            name="result"
            rows={2}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Stack (comma separated)</span>
          <input
            name="stack"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Impact (comma separated)</span>
          <input
            name="impact"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Tags (comma separated)</span>
          <input
            name="tags"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Links (JSON)</span>
          <textarea
            name="links"
            rows={3}
            placeholder='[{"label":"Live Demo","url":"https://...","icon":"demo"}]'
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Cover image URL</span>
          <input
            name="coverImage"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" /> Publish now
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save project
          </button>
          <Link className="ui-link" href="/admin/projects">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
