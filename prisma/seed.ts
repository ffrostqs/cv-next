import { PrismaClient } from "@prisma/client";
import { de } from "../src/i18n/dictionaries/de";
import { en } from "../src/i18n/dictionaries/en";
import { LANGUAGE_META } from "../src/config/languages";
import { NAV_ITEMS } from "../src/components/header/navigation/navigation.config";

const prisma = new PrismaClient();

const dictionaries = {
  de,
  en,
} as const;

type LocaleCode = keyof typeof dictionaries;

const sectionKeys = [
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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getSectionData(locale: LocaleCode, key: (typeof sectionKeys)[number]) {
  const dict = dictionaries[locale];

  switch (key) {
    case "hero":
      return dict.hero;
    case "experience":
      return dict.experience;
    case "about_summary":
      return dict.about.summary;
    case "about_full":
      return dict.about.full;
    case "projects":
      return dict.projects;
    case "skills":
      return dict.skills;
    case "resume":
      return dict.resume;
    case "footer":
      return dict.footer;
    case "global":
      return dict.global;
    case "nav":
      return dict.nav;
    case "terms":
      return dict.terms;
    case "privacy":
      return dict.privacy;
    case "notFound":
      return dict.notFound;
    default:
      return {};
  }
}

async function main() {
  const localeRecords = await Promise.all(
    (Object.keys(dictionaries) as LocaleCode[]).map(async (code, index) => {
      const meta = LANGUAGE_META[code];
      return prisma.locale.upsert({
        where: { code },
        update: {
          name: meta.label,
          flag: meta.flag,
          isDefault: code === "de",
          order: index,
        },
        create: {
          code,
          name: meta.label,
          flag: meta.flag,
          isDefault: code === "de",
          order: index,
        },
      });
    })
  );

  for (const [index, key] of sectionKeys.entries()) {
    const section = await prisma.siteSection.upsert({
      where: { key },
      update: { order: index },
      create: { key, order: index },
    });

    for (const locale of localeRecords) {
      const data = getSectionData(locale.code as LocaleCode, key);
      await prisma.siteSectionTranslation.upsert({
        where: {
          sectionId_localeId: {
            sectionId: section.id,
            localeId: locale.id,
          },
        },
        update: {
          title: key,
          data,
        },
        create: {
          sectionId: section.id,
          localeId: locale.id,
          title: key,
          data,
        },
      });
    }
  }

  const menu = await prisma.menu.upsert({
    where: { key: "main" },
    update: {},
    create: { key: "main" },
  });

  for (const [index, item] of NAV_ITEMS.entries()) {
    const menuItem = await prisma.menuItem.upsert({
      where: {
        id: `${menu.id}-${item.key}`,
      },
      update: {
        href: item.href,
        order: index,
        menuId: menu.id,
      },
      create: {
        id: `${menu.id}-${item.key}`,
        menuId: menu.id,
        href: item.href,
        order: index,
      },
    });

    for (const locale of localeRecords) {
      const dict = dictionaries[locale.code as LocaleCode];
      const label = dict.nav[item.key as keyof typeof dict.nav] ?? item.key;
      await prisma.menuItemTranslation.upsert({
        where: {
          menuItemId_localeId: {
            menuItemId: menuItem.id,
            localeId: locale.id,
          },
        },
        update: { label },
        create: {
          menuItemId: menuItem.id,
          localeId: locale.id,
          label,
        },
      });
    }
  }

  const defaultLocale = localeRecords.find((locale) => locale.code === "de") ?? localeRecords[0];

  const baseProjects = dictionaries.de.projects.items;
  for (const [order, item] of baseProjects.entries()) {
    const projectId = `project-${item.id}`;
    const project = await prisma.project.upsert({
      where: { id: projectId },
      update: { coverImage: item.image ?? null },
      create: { id: projectId, coverImage: item.image ?? null },
    });

    await prisma.projectLink.deleteMany({ where: { projectId: project.id } });
    if (item.links?.length) {
      await prisma.projectLink.createMany({
        data: item.links.map((link, linkIndex) => ({
          projectId: project.id,
          label: link.label,
          url: link.url,
          icon: link.icon,
          order: linkIndex,
        })),
      });
    }

    for (const locale of localeRecords) {
      const localeDict = dictionaries[locale.code as LocaleCode];
      const localeItem = localeDict.projects.items.find((projectItem) => projectItem.id === item.id);
      if (!localeItem) continue;

      await prisma.projectTranslation.upsert({
        where: {
          projectId_localeId: {
            projectId: project.id,
            localeId: locale.id,
          },
        },
        update: {
          title: localeItem.title,
          slug: slugify(localeItem.title),
          category: localeItem.category,
          meta: localeItem.meta ?? null,
          description: localeItem.description,
          problem: localeItem.problem ?? null,
          solution: localeItem.solution ?? null,
          result: localeItem.result ?? null,
          impact: localeItem.impact ?? null,
          stack: localeItem.stack ?? null,
          tags: localeItem.tags ?? null,
          published: true,
          publishedAt: new Date(),
        },
        create: {
          projectId: project.id,
          localeId: locale.id,
          title: localeItem.title,
          slug: slugify(localeItem.title),
          category: localeItem.category,
          meta: localeItem.meta ?? null,
          description: localeItem.description,
          problem: localeItem.problem ?? null,
          solution: localeItem.solution ?? null,
          result: localeItem.result ?? null,
          impact: localeItem.impact ?? null,
          stack: localeItem.stack ?? null,
          tags: localeItem.tags ?? null,
          published: true,
          publishedAt: new Date(),
        },
      });
    }
  }

  const baseCategories = dictionaries.de.skills.categories;
  for (const [order, category] of baseCategories.entries()) {
    const categoryId = `skill-${category.id}`;
    const skillCategory = await prisma.skillCategory.upsert({
      where: { id: categoryId },
      update: { icon: category.icon, order },
      create: { id: categoryId, icon: category.icon, order },
    });

    for (const locale of localeRecords) {
      const localeDict = dictionaries[locale.code as LocaleCode];
      const localeCategory = localeDict.skills.categories.find((item) => item.id === category.id);
      if (!localeCategory) continue;

      await prisma.skillCategoryTranslation.upsert({
        where: {
          skillCategoryId_localeId: {
            skillCategoryId: skillCategory.id,
            localeId: locale.id,
          },
        },
        update: {
          title: localeCategory.title,
          description: localeCategory.description ?? null,
        },
        create: {
          skillCategoryId: skillCategory.id,
          localeId: locale.id,
          title: localeCategory.title,
          description: localeCategory.description ?? null,
        },
      });

      if (localeCategory.skills?.length) {
        await prisma.skill.deleteMany({
          where: { skillCategoryId: skillCategory.id, localeId: locale.id },
        });
        await prisma.skill.createMany({
          data: localeCategory.skills.map((label, index) => ({
            skillCategoryId: skillCategory.id,
            localeId: locale.id,
            label,
            order: index,
          })),
        });
      }
    }
  }

  const baseExperience = dictionaries.de.experience.items;
  for (const [order, item] of baseExperience.entries()) {
    const experienceId = `experience-${item.id ?? order}`;
    const experienceItem = await prisma.experienceItem.upsert({
      where: { id: experienceId },
      update: {
        order,
        companyUrl: item.companyUrl ?? null,
        icon: item.icon ?? null,
      },
      create: {
        id: experienceId,
        order,
        companyUrl: item.companyUrl ?? null,
        icon: item.icon ?? null,
      },
    });

    for (const locale of localeRecords) {
      const localeDict = dictionaries[locale.code as LocaleCode];
      const localeItem = localeDict.experience.items.find((experience) => experience.id === item.id);
      if (!localeItem) continue;

      await prisma.experienceItemTranslation.upsert({
        where: {
          experienceItemId_localeId: {
            experienceItemId: experienceItem.id,
            localeId: locale.id,
          },
        },
        update: {
          role: localeItem.role,
          company: localeItem.company,
          period: localeItem.period,
          description: localeItem.description ?? null,
          achievements: localeItem.achievements ?? null,
          stack: localeItem.stack ?? null,
        },
        create: {
          experienceItemId: experienceItem.id,
          localeId: locale.id,
          role: localeItem.role,
          company: localeItem.company,
          period: localeItem.period,
          description: localeItem.description ?? null,
          achievements: localeItem.achievements ?? null,
          stack: localeItem.stack ?? null,
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
