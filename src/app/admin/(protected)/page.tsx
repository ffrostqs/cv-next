import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHome() {
  const [posts, pages] = await Promise.all([
    prisma.post.count(),
    prisma.page.count(),
  ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2">
        <div className="ui-surface-card p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Posts
          </p>
          <p className="text-3xl font-semibold mt-2">{posts}</p>
          <Link className="ui-link mt-4" href="/admin/posts">
            Manage posts
          </Link>
        </div>
        <div className="ui-surface-card p-6 rounded-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Pages
          </p>
          <p className="text-3xl font-semibold mt-2">{pages}</p>
          <Link className="ui-link mt-4" href="/admin/pages">
            Manage pages
          </Link>
        </div>
      </section>

      <section className="ui-surface-card p-6 rounded-2xl">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="ui-link" href="/admin/posts/new">
            New post
          </Link>
          <Link className="ui-link" href="/admin/pages/new">
            New page
          </Link>
        </div>
      </section>
    </div>
  );
}
