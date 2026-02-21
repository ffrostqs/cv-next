import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateNotFoundSection } from "@/lib/admin-actions";

export default async function NotFoundBuilder({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const locales = await getAllLocales();
  const defaultLocale = locales.find((locale) => locale.isDefault) ?? locales[0];
  const activeLocale =
    locales.find((locale) => locale.code === resolvedSearchParams?.locale) ??
    defaultLocale;

  const dictionary = await getDictionary(activeLocale?.code ?? "de");
  const notFound = dictionary.notFound;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Not found
          </p>
          <h3 className="text-2xl font-semibold">404 content</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Update the message and CTA on the 404 page.
          </p>
        </div>
        <LocaleSwitch
          value={activeLocale?.code ?? "de"}
          options={locales.map((locale) => ({
            code: locale.code,
            name: locale.name,
          }))}
        />
      </div>

      <form
        action={updateNotFoundSection}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            defaultValue={notFound.title}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={3}
            required
            defaultValue={notFound.description}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Back to home label</span>
          <input
            name="backToHome"
            required
            defaultValue={notFound.backToHome}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save 404 content
          </button>
        </div>
      </form>
    </div>
  );
}
