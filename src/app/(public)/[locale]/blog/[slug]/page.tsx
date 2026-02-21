import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/config/languages";
import ReactMarkdown from "react-markdown";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  return (
    <Section variant="default">
      <article className="mx-auto max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          Blog
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="ui-text-muted mt-4 text-lg leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="mt-6 text-xs text-[color:var(--text-secondary)]">
          {post.publishedAt
            ? post.publishedAt.toLocaleDateString()
            : post.createdAt.toLocaleDateString()}
        </div>

        <div className="mt-10 space-y-4 text-base leading-7 text-[color:var(--text-primary)]">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </Section>
  );
}
