import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/lib/admin-actions";
import { notFound } from "next/navigation";
import { getAllLocales } from "@/lib/locales";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";

export default async function EditProject({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ locale?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearchParams?.locale) ??
    defaultLocale;

  const translation = activeLocale
    ? await prisma.projectTranslation.findUnique({
        where: {
          projectId_localeId: {
            projectId: id,
            localeId: activeLocale.id,
          },
        },
      })
    : null;

  const links = await prisma.projectLink.findMany({
    where: { projectId: id },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Projects
          </p>
          <h2 className="text-2xl font-semibold">Edit project</h2>
        </div>
        <Link className="ui-link" href="/admin/projects">
          Back
        </Link>
      </div>

      <form
        action={updateProject.bind(null, project.id)}
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
          <span className="text-sm">Category</span>
          <input
            name="category"
            required
            defaultValue={translation?.category ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Meta</span>
          <input
            name="meta"
            defaultValue={translation?.meta ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={3}
            required
            defaultValue={translation?.description ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Problem</span>
          <textarea
            name="problem"
            rows={2}
            defaultValue={translation?.problem ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Solution</span>
          <textarea
            name="solution"
            rows={2}
            defaultValue={translation?.solution ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Result</span>
          <textarea
            name="result"
            rows={2}
            defaultValue={translation?.result ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Stack (comma separated)</span>
          <input
            name="stack"
            defaultValue={(translation?.stack as string[] | undefined)?.join(", ") ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Impact (comma separated)</span>
          <input
            name="impact"
            defaultValue={(translation?.impact as string[] | undefined)?.join(", ") ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Tags (comma separated)</span>
          <input
            name="tags"
            defaultValue={(translation?.tags as string[] | undefined)?.join(", ") ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Links (JSON)</span>
          <textarea
            name="links"
            rows={3}
            defaultValue={JSON.stringify(
              links.map((link) => ({
                label: link.label,
                url: link.url,
                icon: link.icon,
              }))
            )}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Cover image URL</span>
          <input
            name="coverImage"
            defaultValue={project.coverImage ?? ""}
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
          <Link className="ui-link" href="/admin/projects">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
