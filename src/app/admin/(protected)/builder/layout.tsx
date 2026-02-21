import Link from "next/link";
import { BuilderNav } from "./BuilderNav";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Builder
          </p>
          <h2 className="text-2xl font-semibold">Site Builder</h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Edit homepage sections, legal pages, and global UI copy.
          </p>
        </div>
        <Link className="ui-link" href="/admin">
          Back to overview
        </Link>
      </div>

      <BuilderNav />

      {children}
    </div>
  );
}
