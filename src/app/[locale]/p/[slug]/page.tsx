import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/config/languages";
import ReactMarkdown from "react-markdown";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const page = await getPageBySlug(locale, slug);
  if (!page) notFound();

  return (
    <Section variant="default">
      <article className="mx-auto max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          Page
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
          {page.title}
        </h1>
        <div className="mt-10 space-y-4 text-base leading-7 text-[color:var(--text-primary)]">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
      </article>
    </Section>
  );
}
