import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { isLocale, type Locale } from "@/config/languages";

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const posts = await getPublishedPosts(locale);

  return (
    <Section id="blog" variant="default">
      <SectionHeader
        icon="projects"
        badge="Blog"
        title="Latest articles"
        description="Notes, deep dives, and practical engineering write-ups."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="ui-surface-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {post.excerpt && (
              <p className="ui-text-muted mt-3 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--text-secondary)]">
              <span>
                {post.publishedAt
                  ? post.publishedAt.toLocaleDateString()
                  : post.createdAt.toLocaleDateString()}
              </span>
              <Link className="ui-link" href={`/${locale}/blog/${post.slug}`}>
                Read
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
