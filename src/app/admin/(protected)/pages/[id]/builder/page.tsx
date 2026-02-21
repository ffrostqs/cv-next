import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getDefaultLocale } from "@/lib/locales";
import { coercePageContent } from "@/lib/editor/page-content";
import { PageBuilder } from "@/components/editor/PageBuilder";
import { setPagePublished } from "@/lib/admin-actions";

export default async function PageBuilderRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  const defaultLocale = await getDefaultLocale();
  const translation = defaultLocale
    ? await prisma.pageTranslation.findUnique({
        where: {
          pageId_localeId: {
            pageId: id,
            localeId: defaultLocale.id,
          },
        },
      })
    : null;

  const initialContent = coercePageContent(page.content);
  const isPublished = translation?.published ?? false;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Pages
          </p>
          <h2 className="text-2xl font-semibold">
            Builder · {translation?.title ?? "Untitled page"}
          </h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Editing structured block content stored on the page entity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {translation ? (
            <form action={setPagePublished} className="inline-flex">
              <input type="hidden" name="pageId" value={page.id} />
              <input type="hidden" name="localeId" value={translation.localeId} />
              <input type="hidden" name="published" value={isPublished ? "false" : "true"} />
              <button
                aria-pressed={isPublished}
                className={
                  isPublished
                    ? "rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200"
                    : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[color:var(--text-secondary)]"
                }
                type="submit"
              >
                {isPublished ? "Unpublish" : "Publish"}
              </button>
            </form>
          ) : null}
          <Link className="ui-link" href={`/admin/pages/${id}/edit`}>
            Edit metadata
          </Link>
          <Link className="ui-link" href="/admin/pages">
            Back
          </Link>
        </div>
      </div>

      <PageBuilder pageId={id} initialContent={initialContent} />
    </div>
  );
}
