import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateLegalSection } from "@/lib/admin-actions";

export default async function LegalBuilder({
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
  const terms = dictionary.terms;
  const privacy = dictionary.privacy;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Legal
          </p>
          <h3 className="text-2xl font-semibold">Terms & privacy</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Update legal pages and last updated timestamps.
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
        action={updateLegalSection.bind(null, "terms")}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Terms of service</h4>
        </div>

        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            defaultValue={terms.title}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Updated at</span>
          <input
            name="updatedAt"
            required
            defaultValue={terms.updatedAt}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Sections (JSON array)</span>
          <textarea
            name="sections"
            rows={8}
            defaultValue={JSON.stringify(terms.sections ?? [], null, 2)}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
          />
          <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
            Each section should include id, title, paragraphs[], and optional list[].
          </span>
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save terms
          </button>
        </div>
      </form>

      <form
        action={updateLegalSection.bind(null, "privacy")}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Privacy policy</h4>
        </div>

        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            defaultValue={privacy.title}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Updated at</span>
          <input
            name="updatedAt"
            required
            defaultValue={privacy.updatedAt}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Sections (JSON array)</span>
          <textarea
            name="sections"
            rows={8}
            defaultValue={JSON.stringify(privacy.sections ?? [], null, 2)}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
          />
          <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
            Each section should include id, title, paragraphs[], and optional list[].
          </span>
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save privacy
          </button>
        </div>
      </form>
    </div>
  );
}
