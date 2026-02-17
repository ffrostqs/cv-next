import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          Settings
        </p>
        <h2 className="text-2xl font-semibold">Site settings</h2>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
          Manage global configuration for your site.
        </p>
      </div>

      <div className="ui-surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Languages</h3>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
              Add new languages and manage locale slugs.
            </p>
          </div>
          <Link className="ui-link" href="/admin/settings/languages">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
