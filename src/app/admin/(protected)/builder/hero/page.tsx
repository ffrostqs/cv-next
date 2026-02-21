import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateHeroSection } from "@/lib/admin-actions";

export default async function HeroBuilder({
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
  const hero = dictionary.hero;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Hero
          </p>
          <h3 className="text-2xl font-semibold">Primary headline</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Update the headline block and call-to-action labels for the homepage.
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
        action={updateHeroSection}
        className="ui-surface-card rounded-2xl p-6 space-y-5"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <label className="block">
          <span className="text-sm">Greeting</span>
          <input
            name="greeting"
            required
            defaultValue={hero.greeting}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Name</span>
          <input
            name="name"
            required
            defaultValue={hero.name}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Title</span>
          <input
            name="title"
            required
            defaultValue={hero.title}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={3}
            required
            defaultValue={hero.description}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Location</span>
          <input
            name="location"
            required
            defaultValue={hero.location}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Availability (optional)</span>
          <input
            name="availability"
            defaultValue={hero.availability ?? ""}
            placeholder="Available for new projects"
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm">Primary CTA</span>
            <input
              name="contact"
              required
              defaultValue={hero.contact}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Secondary CTA</span>
            <input
              name="resume"
              required
              defaultValue={hero.resume}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm">Resume URL</span>
          <input
            name="resumeUrl"
            required
            defaultValue={hero.resumeUrl}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm">Availability badge</span>
            <input
              name="available"
              required
              defaultValue={hero.available}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Remote badge</span>
            <input
              name="remote"
              required
              defaultValue={hero.remote}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm">Get in touch label</span>
          <input
            name="getInTouch"
            required
            defaultValue={hero.getInTouch}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save hero
          </button>
        </div>
      </form>
    </div>
  );
}
