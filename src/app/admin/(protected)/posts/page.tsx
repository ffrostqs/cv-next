import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/lib/admin-actions";
import { getDefaultLocale } from "@/lib/locales";

export default async function AdminPosts() {
  const defaultLocale = await getDefaultLocale();
  const posts = await prisma.postTranslation.findMany({
    where: defaultLocale ? { localeId: defaultLocale.id } : undefined,
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Posts
          </p>
          <h2 className="text-2xl font-semibold">Blog posts</h2>
        </div>
        <Link className="ui-link" href="/admin/posts/new">
          New post
        </Link>
      </div>

      <div className="ui-surface-card p-0 overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-[color:var(--text-secondary)]">
            <tr className="border-b border-[color:var(--border-muted)]">
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Updated</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-[color:var(--border-muted)] last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-[color:var(--text-secondary)]">
                    /{post.slug}
                  </div>
                </td>
                <td className="px-5 py-4">
                  {post.published ? "Published" : "Draft"}
                </td>
                <td className="px-5 py-4">
                  {post.updatedAt.toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      className="ui-link"
                      href={`/admin/posts/${post.postId}/edit`}
                    >
                      Edit
                    </Link>
                    <form action={deletePost.bind(null, post.postId)}>
                      <button className="ui-link" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
