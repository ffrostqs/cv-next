import { prisma } from "@/lib/prisma";

export async function getPublishedPosts(locale: string) {
  return prisma.postTranslation.findMany({
    where: { published: true, locale: { code: locale } },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPostBySlug(locale: string, slug: string) {
  return prisma.postTranslation.findFirst({
    where: { slug, published: true, locale: { code: locale } },
  });
}

export async function getPublishedPages(locale: string) {
  return prisma.pageTranslation.findMany({
    where: { published: true, locale: { code: locale } },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPageBySlug(locale: string, slug: string) {
  return prisma.pageTranslation.findFirst({
    where: { slug, published: true, locale: { code: locale } },
  });
}
