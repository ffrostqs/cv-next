import { getAllLocales } from "@/lib/locales";
import { getDictionary } from "@/i18n";
import { LocaleSwitch } from "@/components/admin/LocaleSwitch";
import { updateResumeSection } from "@/lib/admin-actions";

export default async function ResumeBuilder({
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
  const resume = dictionary.resume;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Resume
          </p>
          <h3 className="text-2xl font-semibold">Resume & contact cards</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Configure resume download copy and contact/social blocks.
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
        action={updateResumeSection}
        className="ui-surface-card rounded-2xl p-6 space-y-6"
      >
        <input type="hidden" name="locale" value={activeLocale?.code} />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm">Subtitle</span>
            <input
              name="subtitle"
              required
              defaultValue={resume.subtitle}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Title</span>
            <input
              name="title"
              required
              defaultValue={resume.title}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            rows={3}
            required
            defaultValue={resume.description}
            className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          />
        </label>

        <div className="rounded-2xl border border-[color:var(--border-muted)] p-4 space-y-4">
          <h4 className="text-sm font-semibold">Resume card</h4>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm">Card title</span>
              <input
                name="resumeCardTitle"
                required
                defaultValue={resume.resumeCard.title}
                className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
              />
            </label>

            <label className="block">
              <span className="text-sm">Meta</span>
              <input
                name="resumeCardMeta"
                required
                defaultValue={resume.resumeCard.meta}
                className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm">Features (JSON array)</span>
            <textarea
              name="resumeCardFeatures"
              rows={4}
              defaultValue={JSON.stringify(resume.resumeCard.features ?? [], null, 2)}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm">Download label</span>
              <input
                name="resumeCardDownload"
                required
                defaultValue={resume.resumeCard.downloadLabel}
                className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
              />
            </label>

            <label className="block">
              <span className="text-sm">File URL</span>
              <input
                name="resumeCardFile"
                required
                defaultValue={resume.resumeCard.fileUrl}
                className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--border-muted)] p-4 space-y-4">
          <h4 className="text-sm font-semibold">Contact card</h4>

          <label className="block">
            <span className="text-sm">Card title</span>
            <input
              name="contactTitle"
              required
              defaultValue={resume.contactCard.title}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Items (JSON array)</span>
            <textarea
              name="contactItems"
              rows={5}
              defaultValue={JSON.stringify(resume.contactCard.items ?? [], null, 2)}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
            />
            <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
              Example: [{{"icon":"mail","label":"Email","value":"hello@example.com"}}]
            </span>
          </label>
        </div>

        <div className="rounded-2xl border border-[color:var(--border-muted)] p-4 space-y-4">
          <h4 className="text-sm font-semibold">Social card</h4>

          <label className="block">
            <span className="text-sm">Card title</span>
            <input
              name="socialTitle"
              required
              defaultValue={resume.socialCard.title}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Items (JSON array)</span>
            <textarea
              name="socialItems"
              rows={5}
              defaultValue={JSON.stringify(resume.socialCard.items ?? [], null, 2)}
              className="mt-2 w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2 font-mono text-xs"
            />
            <span className="mt-2 block text-xs text-[color:var(--text-secondary)]">
              Example: [{{"icon":"github","label":"GitHub","url":"https://github.com"}}]
            </span>
          </label>
        </div>

        <div className="flex gap-3">
          <button className="ui-link" type="submit">
            Save resume
          </button>
        </div>
      </form>
    </div>
  );
}
