import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/lib/admin-actions";
import { notFound } from "next/navigation";
import { getAllLocales } from "@/lib/locales";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";

export default async function EditExperience({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ locale?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const item = await prisma.experienceItem.findUnique({ where: { id } });
  if (!item) notFound();

  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearchParams?.locale) ??
    defaultLocale;

  const translation = activeLocale
    ? await prisma.experienceItemTranslation.findUnique({
        where: {
          experienceItemId_localeId: {
            experienceItemId: id,
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
            Experience
          </p>
          <h2 className="text-2xl font-semibold">Edit experience</h2>
        </div>
        <Link className="ui-link" href="/admin/experience">
          Back
        </Link>
      </div>

      <form
        action={updateExperience.bind(null, id)}
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
          <span className="text-sm">Role</span>
          <input
            name="role"
            required
            defaultValue={translation?.role ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Company</span>
          <input
            name="company"
            required
            defaultValue={translation?.company ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Period</span>
          <input
            name="period"
            required
            defaultValue={translation?.period ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={3}
            defaultValue={translation?.description ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Achievements (comma separated)</span>
          <textarea
            name="achievements"
            rows={3}
            defaultValue={(translation?.achievements as string[] | undefined)?.join(", ") ?? ""}
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
          <span className="text-sm">Company URL</span>
          <input
            name="companyUrl"
            defaultValue={item.companyUrl ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Icon</span>
          <input
            name="icon"
            defaultValue={item.icon ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
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
          <Link className="ui-link" href="/admin/experience">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
