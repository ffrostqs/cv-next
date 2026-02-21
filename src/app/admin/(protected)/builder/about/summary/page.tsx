import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateAboutSummarySection } from "@/lib/admin-actions";

export default async function AboutSummaryBuilder({
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
  const about = dictionary.about.summary;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            About summary
          </p>
          <h3 className="text-2xl font-semibold">Homepage intro</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Control the short about section on the homepage.
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
        action={updateAboutSummarySection}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Subtitle</span>
          <input
            name="subtitle"
            required
            defaultValue={about.subtitle}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            defaultValue={about.title}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={4}
            required
            defaultValue={about.description}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save summary
          </button>
        </div>
      </form>
    </div>
  );
}
