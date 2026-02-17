import "server-only";

import type { Dictionary } from "./types";
import { en } from "./dictionaries/en/";
import { de } from "./dictionaries/de/";
import { prisma } from "@/lib/prisma";

const dictionaries: Record<string, Dictionary> = {
  en,
  de,
};

const SECTION_KEYS = [
  "hero",
  "experience",
  "about_summary",
  "about_full",
  "projects",
  "skills",
  "resume",
  "footer",
  "global",
  "nav",
  "terms",
  "privacy",
  "notFound",
] as const;

function fallbackDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const fallback = fallbackDictionary(locale);

  const sections = await prisma.siteSection.findMany({
    where: { key: { in: [...SECTION_KEYS] } },
    include: {
      content: {
        where: { locale: { code: locale } },
      },
    },
  });

  if (!sections.length) {
    return fallback;
  }

  const byKey = new Map(
    sections.map((section) => [section.key, section.content[0]?.data ?? null])
  );

  const projects = await prisma.projectTranslation.findMany({
    where: { published: true, locale: { code: locale } },
    orderBy: { publishedAt: "desc" },
    include: {
      project: {
        include: {
          links: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  const skills = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      translations: { where: { locale: { code: locale } } },
      skills: {
        where: { locale: { code: locale } },
        orderBy: { order: "asc" },
      },
    },
  });

  const experience = await prisma.experienceItem.findMany({
    orderBy: { order: "asc" },
    include: {
      translations: { where: { locale: { code: locale } } },
    },
  });

  return {
    hero: (byKey.get("hero") as Dictionary["hero"]) ?? fallback.hero,
    experience: {
      ...(((byKey.get("experience") as Dictionary["experience"]) ??
        fallback.experience) as Dictionary["experience"]),
      items:
        experience.length > 0
          ? experience.map((item, index) => {
              const translation = item.translations[0];
              return {
                id: translation?.id ?? `experience-${index}`,
                role: translation?.role ?? "",
                company: translation?.company ?? "",
                companyUrl: item.companyUrl ?? undefined,
                period: translation?.period ?? "",
                description: translation?.description ?? undefined,
                achievements: (translation?.achievements as string[]) ?? undefined,
                stack: (translation?.stack as string[]) ?? undefined,
                icon: (item.icon as Dictionary["experience"]["items"][number]["icon"]) ?? undefined,
              };
            })
          : fallback.experience.items,
    },
    projects: {
      ...(((byKey.get("projects") as Dictionary["projects"]) ??
        fallback.projects) as Dictionary["projects"]),
      items:
        projects.length > 0
          ? projects.map((item, index) => ({
              id: index + 1,
              category: item.category,
              meta: item.meta ?? "",
              image: item.project.coverImage ?? "",
              title: item.title,
              description: item.description,
              problem: item.problem ?? "",
              solution: item.solution ?? undefined,
              result: item.result ?? undefined,
              tags: (item.tags as string[]) ?? [],
              stack: (item.stack as string[]) ?? [],
              links: item.project.links.map((link, linkIndex) => ({
                label: link.label,
                url: link.url,
                icon: link.icon,
                id: `project-${index}-link-${linkIndex}`,
              })),
              impact: (item.impact as string[]) ?? undefined,
            }))
          : fallback.projects.items,
    },
    skills: {
      ...(((byKey.get("skills") as Dictionary["skills"]) ??
        fallback.skills) as Dictionary["skills"]),
      categories:
        skills.length > 0
          ? skills.map((category) => {
              const translation = category.translations[0];
              return {
                id: category.id,
                icon: category.icon,
                title: translation?.title ?? "",
                description: translation?.description ?? undefined,
                skills: category.skills.map((skill) => skill.label),
              };
            })
          : fallback.skills.categories,
    },
    resume: (byKey.get("resume") as Dictionary["resume"]) ?? fallback.resume,
    footer: (byKey.get("footer") as Dictionary["footer"]) ?? fallback.footer,
    global: (byKey.get("global") as Dictionary["global"]) ?? fallback.global,
    nav: (byKey.get("nav") as Dictionary["nav"]) ?? fallback.nav,
    terms: (byKey.get("terms") as Dictionary["terms"]) ?? fallback.terms,
    privacy:
      (byKey.get("privacy") as Dictionary["privacy"]) ?? fallback.privacy,
    notFound:
      (byKey.get("notFound") as Dictionary["notFound"]) ?? fallback.notFound,
    about: {
      summary:
        (byKey.get("about_summary") as Dictionary["about"]["summary"]) ??
        fallback.about.summary,
      full:
        (byKey.get("about_full") as Dictionary["about"]["full"]) ??
        fallback.about.full,
    },
  };
}
