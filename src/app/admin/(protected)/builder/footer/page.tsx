import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateFooterSection } from "@/lib/admin-actions";

export default async function FooterBuilder({
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
  const footer = dictionary.footer;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Footer
          </p>
          <h3 className="text-2xl font-semibold">Footer content</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Manage footer messaging, navigation, and social links.
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
        action={updateFooterSection}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Tagline</span>
          <input
            name="tagline"
            required
            defaultValue={footer.tagline}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Navigation (JSON array)</span>
          <textarea
            name="navigation"
            rows={4}
            defaultValue={JSON.stringify(footer.navigation ?? [], null, 2)}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
          />
          <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
            Example: [{{"label":"About","href":"#about"}}]
          </span>
        </label>

        <label className="block">
          <span className="text-sm">Socials (JSON array)</span>
          <textarea
            name="socials"
            rows={4}
            defaultValue={JSON.stringify(footer.socials ?? [], null, 2)}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
          />
          <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
            Example: [{{"label":"GitHub","href":"https://github.com","icon":"github"}}]
          </span>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm">Built with</span>
            <input
              name="builtWith"
              required
              defaultValue={footer.builtWith}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Copyright</span>
            <input
              name="copyright"
              required
              defaultValue={footer.copyright}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save footer
          </button>
        </div>
      </form>
    </div>
  );
}
