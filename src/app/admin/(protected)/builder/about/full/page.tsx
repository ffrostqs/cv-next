import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateAboutFullSection } from "@/lib/admin-actions";

export default async function AboutFullBuilder({
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
  const about = dictionary.about.full;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            About full
          </p>
          <h3 className="text-2xl font-semibold">Extended story</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Manage the detailed about section, stats, and approach cards.
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
        action={updateAboutFullSection}
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
            rows={5}
            required
            defaultValue={about.description}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Stats (JSON array)</span>
          <textarea
            name="stats"
            rows={5}
            defaultValue={JSON.stringify(about.stats ?? [], null, 2)}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
          />
          <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
            Example: [{{"id":"stat-1","icon":"projects","value":"30+","label":"Projects"}}]
          </span>
        </label>

        <label className="block">
          <span className="text-sm">Approach title</span>
          <input
            name="approachTitle"
            defaultValue={about.approach?.title ?? ""}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Approach items (JSON array)</span>
          <textarea
            name="approachItems"
            rows={6}
            defaultValue={JSON.stringify(about.approach?.items ?? [], null, 2)}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
          />
          <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
            Example: [{{"id":"ownership","icon":"skills","title":"Ownership","description":"..."}}]
          </span>
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save full about
          </button>
        </div>
      </form>
    </div>
  );
}
