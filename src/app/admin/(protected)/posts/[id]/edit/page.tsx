import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updatePost } from "@/lib/admin-actions";
import { notFound } from "next/navigation";
import { getAllLocales } from "@/lib/locales";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ locale?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearchParams?.locale) ??
    defaultLocale;

  const translation = activeLocale
    ? await prisma.postTranslation.findUnique({
        where: {
          postId_localeId: {
            postId: id,
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
            Posts
          </p>
          <h2 className="text-2xl font-semibold">Edit post</h2>
        </div>
        <Link className="ui-link" href="/admin/posts">
          Back
        </Link>
      </div>

      <form
        action={updatePost.bind(null, post.id)}
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
          <span className="text-sm">Excerpt</span>
          <textarea
            name="excerpt"
            rows={3}
            defaultValue={translation?.excerpt ?? ""}
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

        <label className="block">
          <span className="text-sm">Cover image URL</span>
          <input
            name="coverImage"
            defaultValue={post.coverImage ?? ""}
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
          <Link className="ui-link" href="/admin/posts">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
