import { getAllLocales } from "@/lib/locales";
import {
  createLocale,
  setDefaultLocale,
  updateLocaleActive,
  updateLocaleOrder,
} from "@/lib/admin-actions";

export default async function SettingsLanguagesPage() {
  const locales = await getAllLocales();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          Settings
        </p>
        <h2 className="text-2xl font-semibold">Languages</h2>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
          Add languages and manage their locale slugs.
        </p>
      </div>

      <form
        action={createLocale}
        className="ui-surface-card rounded-2xl p-6 space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-4">
          <label className="block">
            <span className="text-sm">Locale slug</span>
            <input
              name="code"
              required
              placeholder="en"
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm">Name</span>
            <input
              name="name"
              required
              placeholder="English"
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm">Flag</span>
            <input
              name="flag"
              placeholder="🇺🇸"
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
        </div>
        <button className="ui-link text-sm" type="submit">
          Add language
        </button>
      </form>

      <div className="ui-surface-card rounded-2xl p-6 space-y-3">
        {locales.map((locale) => {
          const isDefault = locale.isDefault;
          const canToggle = !isDefault;
          return (
            <div
              key={locale.code}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[color:var(--border-muted)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{locale.flag ?? "🌐"}</span>
                <div>
                  <p className="text-sm font-medium">{locale.name}</p>
                  <p className="text-xs text-[color:var(--text-secondary)]">
                    /{locale.code} {isDefault ? "• default" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <form action={updateLocaleOrder} className="flex items-center gap-2">
                  <input type="hidden" name="code" value={locale.code} />
                  <input
                    name="order"
                    type="number"
                    defaultValue={locale.order}
                    className="w-20 rounded-md border border-[color:var(--border-muted)] bg-transparent px-2 py-1 text-sm"
                  />
                  <button className="ui-link text-xs" type="submit">
                    Save
                  </button>
                </form>

                <form action={updateLocaleActive}>
                  <input type="hidden" name="code" value={locale.code} />
                  <input
                    type="hidden"
                    name="isActive"
                    value={locale.isActive ? "false" : "true"}
                  />
                  <button
                    type="submit"
                    className="ui-link text-sm"
                    disabled={!canToggle}
                  >
                    {locale.isActive ? "Disable" : "Enable"}
                  </button>
                </form>

                {!isDefault && (
                  <form action={setDefaultLocale}>
                    <input type="hidden" name="code" value={locale.code} />
                    <button type="submit" className="ui-link text-sm">
                      Set default
                    </button>
                  </form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
