import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateSkillCategory } from "@/lib/admin-actions";
import { notFound } from "next/navigation";
import { getAllLocales } from "@/lib/locales";
import { LocaleSwitch } from "../../LocaleSwitch";

export default async function EditSkillCategory({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: { locale?: string };
}) {
  const { id } = await params;
  const category = await prisma.skillCategory.findUnique({ where: { id } });
  if (!category) notFound();

  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === searchParams?.locale) ??
    defaultLocale;

  const translation = activeLocale
    ? await prisma.skillCategoryTranslation.findUnique({
        where: {
          skillCategoryId_localeId: {
            skillCategoryId: id,
            localeId: activeLocale.id,
          },
        },
      })
    : null;

  const skills = await prisma.skill.findMany({
    where: { skillCategoryId: id, localeId: activeLocale?.id },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Skills
          </p>
          <h2 className="text-2xl font-semibold">Edit category</h2>
        </div>
        <Link className="ui-link" href="/admin/skills">
          Back
        </Link>
      </div>

      <form
        action={updateSkillCategory.bind(null, id)}
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
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={2}
            defaultValue={translation?.description ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Icon</span>
          <input
            name="icon"
            defaultValue={category.icon}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Order</span>
          <input
            name="order"
            type="number"
            defaultValue={category.order}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Skills (comma separated)</span>
          <textarea
            name="skills"
            rows={4}
            defaultValue={skills.map((skill) => skill.label).join(", ")}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save changes
          </button>
          <Link className="ui-link" href="/admin/skills">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
