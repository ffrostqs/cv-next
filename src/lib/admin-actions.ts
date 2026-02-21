"use server";

import { prisma } from "@/lib/prisma";
import { LANGUAGE_META } from "@/config/languages";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function toBoolean(value: FormDataEntryValue | null): boolean {
  if (!value) return false;
  return value === "on" || value === "true";
}

function toList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toJsonArray(value: FormDataEntryValue | null) {
  if (!value) return [];
  const raw = String(value).trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  about_summary: "About summary",
  about_full: "About full",
  resume: "Resume",
  footer: "Footer",
  terms: "Terms",
  privacy: "Privacy",
  notFound: "Not found",
};

const BUILDER_PATHS: Record<string, string> = {
  hero: "/admin/builder/hero",
  about_summary: "/admin/builder/about/summary",
  about_full: "/admin/builder/about/full",
  resume: "/admin/builder/resume",
  footer: "/admin/builder/footer",
  terms: "/admin/builder/legal",
  privacy: "/admin/builder/legal",
  notFound: "/admin/builder/not-found",
};

async function upsertSectionData({
  key,
  localeCode,
  data,
}: {
  key: string;
  localeCode: string;
  data: Record<string, unknown>;
}) {
  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
          localeCode,
        flag:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        order: 0,
      },
    }));

  const section = await prisma.siteSection.upsert({
    where: { key },
    update: {},
    create: {
      key,
      order: 0,
    },
  });

  const title = SECTION_LABELS[key] ?? key;

  await prisma.siteSectionTranslation.upsert({
    where: {
      sectionId_localeId: {
        sectionId: section.id,
        localeId: locale.id,
      },
    },
    update: {
      title,
      data,
    },
    create: {
      sectionId: section.id,
      localeId: locale.id,
      title,
      data,
    },
  });

  revalidatePath("/admin/builder");
  const builderPath = BUILDER_PATHS[key];
  if (builderPath) revalidatePath(builderPath);
  revalidatePath("/");
  revalidatePath(`/${localeCode}`);
  revalidatePath(`/${localeCode}/privacy`);
  revalidatePath(`/${localeCode}/terms`);
}

export async function createPost(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const published = toBoolean(formData.get("published"));

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (!localeCode) {
    throw new Error("Locale is required");
  }

  const slug = slugRaw ? slugify(slugRaw) : slugify(title);

  const locale = await prisma.locale.findUnique({
    where: { code: localeCode },
  });

  if (!locale) {
    throw new Error("Locale not found");
  }

  const post = await prisma.post.create({
    data: {
      coverImage: coverImage || null,
      authorId: null,
    },
  });

  await prisma.postTranslation.create({
    data: {
      postId: post.id,
      localeId: locale.id,
      title,
      slug,
      excerpt: excerpt || null,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/de/blog`);
  revalidatePath(`/en/blog`);
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const published = toBoolean(formData.get("published"));

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (!localeCode) {
    throw new Error("Locale is required");
  }

  const slug = slugRaw ? slugify(slugRaw) : slugify(title);

  const locale = await prisma.locale.findUnique({
    where: { code: localeCode },
  });

  if (!locale) {
    throw new Error("Locale not found");
  }

  await prisma.post.update({
    where: { id },
    data: {
      coverImage: coverImage || null,
    },
  });

  await prisma.postTranslation.upsert({
    where: {
      postId_localeId: {
        postId: id,
        localeId: locale.id,
      },
    },
    update: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
    create: {
      postId: id,
      localeId: locale.id,
      title,
      slug,
      excerpt: excerpt || null,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/de/blog`);
  revalidatePath(`/en/blog`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath(`/de/blog`);
  revalidatePath(`/en/blog`);
}

export async function createPage(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = toBoolean(formData.get("published"));

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (!localeCode) {
    throw new Error("Locale is required");
  }

  const slug = slugRaw ? slugify(slugRaw) : slugify(title);

  const locale = await prisma.locale.findUnique({
    where: { code: localeCode },
  });

  if (!locale) {
    throw new Error("Locale not found");
  }

  const page = await prisma.page.create({
    data: {
      authorId: null,
    },
  });

  await prisma.pageTranslation.create({
    data: {
      pageId: page.id,
      localeId: locale.id,
      title,
      slug,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/pages");
}

export async function updatePage(id: string, formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = toBoolean(formData.get("published"));

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (!localeCode) {
    throw new Error("Locale is required");
  }

  const slug = slugRaw ? slugify(slugRaw) : slugify(title);

  const locale = await prisma.locale.findUnique({
    where: { code: localeCode },
  });

  if (!locale) {
    throw new Error("Locale not found");
  }

  await prisma.pageTranslation.upsert({
    where: {
      pageId_localeId: {
        pageId: id,
        localeId: locale.id,
      },
    },
    update: {
      title,
      slug,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
    create: {
      pageId: id,
      localeId: locale.id,
      title,
      slug,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/pages");
}

export async function deletePage(id: string) {
  await requireAdmin();
  await prisma.page.delete({ where: { id } });
  revalidatePath("/admin/pages");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function setPagePublished(formData: FormData) {
  await requireAdmin();

  const pageId = String(formData.get("pageId") ?? "").trim();
  const localeId = String(formData.get("localeId") ?? "").trim();
  const published = toBoolean(formData.get("published"));

  if (!pageId || !localeId) {
    throw new Error("Page and locale are required");
  }

  await prisma.pageTranslation.update({
    where: {
      pageId_localeId: {
        pageId,
        localeId,
      },
    },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const meta = String(formData.get("meta") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const solution = String(formData.get("solution") ?? "").trim();
  const result = String(formData.get("result") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const stack = toList(formData.get("stack"));
  const impact = toList(formData.get("impact"));
  const tags = toList(formData.get("tags"));
  const links = toJsonArray(formData.get("links"));
  const published = toBoolean(formData.get("published"));

  if (!localeCode || !title || !category || !description) {
    throw new Error("Locale, title, category and description are required");
  }

  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name: LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ?? localeCode,
        flag: LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        order: 0,
      },
    }));

  const project = await prisma.project.create({
    data: {
      coverImage: coverImage || null,
    },
  });

  await prisma.projectTranslation.create({
    data: {
      projectId: project.id,
      localeId: locale.id,
      title,
      slug: slugRaw ? slugify(slugRaw) : slugify(title),
      category,
      meta: meta || null,
      description,
      problem: problem || null,
      solution: solution || null,
      result: result || null,
      impact: impact.length ? impact : null,
      stack: stack.length ? stack : null,
      tags: tags.length ? tags : null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  if (Array.isArray(links) && links.length) {
    await prisma.projectLink.createMany({
      data: links.map((link: any, index: number) => ({
        projectId: project.id,
        label: String(link.label ?? ""),
        url: String(link.url ?? ""),
        icon: String(link.icon ?? "demo"),
        order: index,
      })),
    });
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const meta = String(formData.get("meta") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const solution = String(formData.get("solution") ?? "").trim();
  const result = String(formData.get("result") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const stack = toList(formData.get("stack"));
  const impact = toList(formData.get("impact"));
  const tags = toList(formData.get("tags"));
  const links = toJsonArray(formData.get("links"));
  const published = toBoolean(formData.get("published"));

  if (!localeCode || !title || !category || !description) {
    throw new Error("Locale, title, category and description are required");
  }

  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
          localeCode,
        flag:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        isActive: true,
        order: 0,
      },
    }));

  await prisma.project.update({
    where: { id },
    data: {
      coverImage: coverImage || null,
    },
  });

  await prisma.projectTranslation.upsert({
    where: {
      projectId_localeId: {
        projectId: id,
        localeId: locale.id,
      },
    },
    update: {
      title,
      slug: slugRaw ? slugify(slugRaw) : slugify(title),
      category,
      meta: meta || null,
      description,
      problem: problem || null,
      solution: solution || null,
      result: result || null,
      impact: impact.length ? impact : null,
      stack: stack.length ? stack : null,
      tags: tags.length ? tags : null,
      published,
      publishedAt: published ? new Date() : null,
    },
    create: {
      projectId: id,
      localeId: locale.id,
      title,
      slug: slugRaw ? slugify(slugRaw) : slugify(title),
      category,
      meta: meta || null,
      description,
      problem: problem || null,
      solution: solution || null,
      result: result || null,
      impact: impact.length ? impact : null,
      stack: stack.length ? stack : null,
      tags: tags.length ? tags : null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  await prisma.projectLink.deleteMany({ where: { projectId: id } });
  if (Array.isArray(links) && links.length) {
    await prisma.projectLink.createMany({
      data: links.map((link: any, index: number) => ({
        projectId: id,
        label: String(link.label ?? ""),
        url: String(link.url ?? ""),
        icon: String(link.icon ?? "demo"),
        order: index,
      })),
    });
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateSkillCategory(id: string, formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);
  const skills = toList(formData.get("skills"));

  if (!localeCode || !title) throw new Error("Locale and title are required");

  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
          localeCode,
        flag:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        isActive: true,
        order: 0,
      },
    }));

  await prisma.skillCategory.update({
    where: { id },
    data: {
      icon: icon || undefined,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  await prisma.skillCategoryTranslation.upsert({
    where: {
      skillCategoryId_localeId: {
        skillCategoryId: id,
        localeId: locale.id,
      },
    },
    update: {
      title,
      description: description || null,
    },
    create: {
      skillCategoryId: id,
      localeId: locale.id,
      title,
      description: description || null,
    },
  });

  await prisma.skill.deleteMany({ where: { skillCategoryId: id, localeId: locale.id } });
  if (skills.length) {
    await prisma.skill.createMany({
      data: skills.map((label, index) => ({
        skillCategoryId: id,
        localeId: locale.id,
        label,
        order: index,
      })),
    });
  }

  revalidatePath("/admin/skills");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/skills");
}

export async function deleteSkillCategory(id: string) {
  await requireAdmin();
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const achievements = toList(formData.get("achievements"));
  const stack = toList(formData.get("stack"));
  const companyUrl = String(formData.get("companyUrl") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!localeCode || !role || !company || !period) {
    throw new Error("Locale, role, company and period are required");
  }

  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
          localeCode,
        flag:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        order: 0,
      },
    }));

  await prisma.experienceItem.update({
    where: { id },
    data: {
      companyUrl: companyUrl || null,
      icon: icon || null,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  await prisma.experienceItemTranslation.upsert({
    where: {
      experienceItemId_localeId: {
        experienceItemId: id,
        localeId: locale.id,
      },
    },
    update: {
      role,
      company,
      period,
      description: description || null,
      achievements: achievements.length ? achievements : null,
      stack: stack.length ? stack : null,
    },
    create: {
      experienceItemId: id,
      localeId: locale.id,
      role,
      company,
      period,
      description: description || null,
      achievements: achievements.length ? achievements : null,
      stack: stack.length ? stack : null,
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await prisma.experienceItem.delete({ where: { id } });
  revalidatePath("/admin/experience");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function createMenuItem(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const parentId = String(formData.get("parentId") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!localeCode || !label || !href) {
    throw new Error("Locale, label and href are required");
  }

  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
          localeCode,
        flag:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        order: 0,
      },
    }));

  const menu =
    (await prisma.menu.findUnique({ where: { key: "main" } })) ??
    (await prisma.menu.create({ data: { key: "main" } }));

  const item = await prisma.menuItem.create({
    data: {
      menuId: menu.id,
      href,
      parentId: parentId || null,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  await prisma.menuItemTranslation.create({
    data: {
      menuItemId: item.id,
      localeId: locale.id,
      label,
      isActive: true,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/header");
}

export async function updateMenuItem(id: string, formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const parentId = String(formData.get("parentId") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!localeCode || !label || !href) {
    throw new Error("Locale, label and href are required");
  }

  const locale =
    (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
    (await prisma.locale.create({
      data: {
        code: localeCode,
        name:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
          localeCode,
        flag:
          LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: localeCode === "de",
        order: 0,
      },
    }));

  const menu =
    (await prisma.menu.findUnique({ where: { key: "main" } })) ??
    (await prisma.menu.create({ data: { key: "main" } }));

  await prisma.menuItem.update({
    where: { id },
    data: {
      href,
      parentId: parentId || null,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  await prisma.menuItemTranslation.upsert({
    where: {
      menuItemId_localeId: {
        menuItemId: id,
        localeId: locale.id,
      },
    },
    update: { label },
    create: { menuItemId: id, localeId: locale.id, label, isActive: true },
  });

  revalidatePath("/admin/menu");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/header");
}

export async function deleteMenuItem(id: string) {
  await requireAdmin();
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/header");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateMenuItemOrder(id: string, formData: FormData) {
  await requireAdmin();
  const order = Number(formData.get("order") ?? 0);

  await prisma.menuItem.update({
    where: { id },
    data: { order: Number.isNaN(order) ? 0 : order },
  });

  revalidatePath("/admin/header");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateLocaleActive(formData: FormData) {
  await requireAdmin();

  const code = String(formData.get("code") ?? "").trim();
  const isActive = formData.get("isActive") === "true";

  if (!code) {
    throw new Error("Locale code is required");
  }

  const locale =
    (await prisma.locale.findUnique({ where: { code } })) ??
    (await prisma.locale.create({
      data: {
        code,
        name: LANGUAGE_META[code as keyof typeof LANGUAGE_META]?.label ?? code,
        flag: LANGUAGE_META[code as keyof typeof LANGUAGE_META]?.flag ?? null,
        isDefault: code === "de",
        isActive: true,
        order: 0,
      },
    }));

  if (locale.isDefault && !isActive) {
    throw new Error("Default locale cannot be disabled");
  }

  await prisma.locale.update({
    where: { code },
    data: { isActive },
  });

  revalidatePath("/admin/header");
  revalidatePath("/");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function createLocale(formData: FormData) {
  await requireAdmin();

  const code = String(formData.get("code") ?? "")
    .trim()
    .toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const flag = String(formData.get("flag") ?? "").trim();

  if (!code || !name) {
    throw new Error("Locale code and name are required");
  }

  await prisma.locale.upsert({
    where: { code },
    update: {
      name,
      flag: flag || null,
      isActive: true,
    },
    create: {
      code,
      name,
      flag: flag || null,
      isDefault: code === "de",
      isActive: true,
      order: 0,
    },
  });

  revalidatePath("/admin/settings/languages");
  revalidatePath("/");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function setDefaultLocale(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code") ?? "").trim();
  if (!code) throw new Error("Locale code is required");

  await prisma.locale.updateMany({
    data: { isDefault: false },
  });

  await prisma.locale.update({
    where: { code },
    data: { isDefault: true, isActive: true },
  });

  revalidatePath("/admin/settings/languages");
  revalidatePath("/");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateLocaleOrder(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);
  if (!code) throw new Error("Locale code is required");

  await prisma.locale.update({
    where: { code },
    data: { order: Number.isNaN(order) ? 0 : order },
  });

  revalidatePath("/admin/settings/languages");
  revalidatePath("/");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateMenuItemVisibility(formData: FormData) {
  await requireAdmin();

  const menuItemId = String(formData.get("menuItemId") ?? "").trim();
  const localeCode = String(formData.get("locale") ?? "").trim();
  const scope = String(formData.get("scope") ?? "").trim();
  const isActive = formData.get("isActive") === "true";

  if (!menuItemId || !scope) {
    throw new Error("Menu item and scope are required");
  }

  if (scope === "global") {
    await prisma.menuItem.update({
      where: { id: menuItemId },
      data: { isActiveGlobal: isActive },
    });
  } else if (scope === "locale") {
    if (!localeCode) throw new Error("Locale is required");

    const locale =
      (await prisma.locale.findUnique({ where: { code: localeCode } })) ??
      (await prisma.locale.create({
        data: {
          code: localeCode,
          name:
            LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.label ??
            localeCode,
          flag:
            LANGUAGE_META[localeCode as keyof typeof LANGUAGE_META]?.flag ?? null,
          isDefault: localeCode === "de",
          isActive: true,
          order: 0,
        },
      }));

    await prisma.menuItemTranslation.upsert({
      where: {
        menuItemId_localeId: {
          menuItemId,
          localeId: locale.id,
        },
      },
      update: { isActive },
      create: {
        menuItemId,
        localeId: locale.id,
        label: "",
        isActive,
      },
    });
  }

  revalidatePath("/admin/header");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
}

export async function updateGlobalSection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const goHome = String(formData.get("goHome") ?? "").trim();

  if (!localeCode || !name || !goHome) {
    throw new Error("Locale, name and goHome are required");
  }

  const locale = await prisma.locale.findUnique({
    where: { code: localeCode },
  });
  if (!locale) throw new Error("Locale not found");

  const section = await prisma.siteSection.upsert({
    where: { key: "global" },
    update: {},
    create: {
      key: "global",
      order: 0,
    },
  });

  await prisma.siteSectionTranslation.upsert({
    where: {
      sectionId_localeId: {
        sectionId: section.id,
        localeId: locale.id,
      },
    },
    update: {
      data: { name, goHome },
    },
    create: {
      sectionId: section.id,
      localeId: locale.id,
      title: "Global",
      data: { name, goHome },
    },
  });

  revalidatePath("/admin/header");
  revalidatePath("/");
  revalidatePath(`/de`);
  revalidatePath(`/en`);
  redirect("/admin/header");
}

export async function updateHeroSection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const greeting = String(formData.get("greeting") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const availability = String(formData.get("availability") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const resume = String(formData.get("resume") ?? "").trim();
  const resumeUrl = String(formData.get("resumeUrl") ?? "").trim();
  const available = String(formData.get("available") ?? "").trim();
  const remote = String(formData.get("remote") ?? "").trim();
  const getInTouch = String(formData.get("getInTouch") ?? "").trim();

  if (
    !localeCode ||
    !greeting ||
    !name ||
    !title ||
    !description ||
    !location ||
    !contact ||
    !resume ||
    !resumeUrl ||
    !available ||
    !remote ||
    !getInTouch
  ) {
    throw new Error("All hero fields are required");
  }

  const data: Record<string, unknown> = {
    greeting,
    name,
    title,
    description,
    location,
    contact,
    resume,
    resumeUrl,
    available,
    remote,
    getInTouch,
  };

  if (availability) {
    data.availability = availability;
  }

  await upsertSectionData({ key: "hero", localeCode, data });
  redirect(`/admin/builder/hero?locale=${localeCode}`);
}

export async function updateAboutSummarySection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!localeCode || !subtitle || !title || !description) {
    throw new Error("Locale, subtitle, title, and description are required");
  }

  await upsertSectionData({
    key: "about_summary",
    localeCode,
    data: { subtitle, title, description },
  });
  redirect(`/admin/builder/about/summary?locale=${localeCode}`);
}

export async function updateAboutFullSection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const stats = toJsonArray(formData.get("stats"));
  const approachTitle = String(formData.get("approachTitle") ?? "").trim();
  const approachItems = toJsonArray(formData.get("approachItems"));

  if (!localeCode || !subtitle || !title || !description) {
    throw new Error("Locale, subtitle, title, and description are required");
  }

  if (approachItems.length > 0 && !approachTitle) {
    throw new Error("Approach title is required when items are provided");
  }

  const data: Record<string, unknown> = { subtitle, title, description };

  if (stats.length) {
    data.stats = stats;
  }

  if (approachTitle || approachItems.length) {
    data.approach = {
      title: approachTitle,
      items: approachItems,
    };
  }

  await upsertSectionData({ key: "about_full", localeCode, data });
  redirect(`/admin/builder/about/full?locale=${localeCode}`);
}

export async function updateResumeSection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const resumeCardTitle = String(formData.get("resumeCardTitle") ?? "").trim();
  const resumeCardMeta = String(formData.get("resumeCardMeta") ?? "").trim();
  const resumeCardFeatures = toJsonArray(formData.get("resumeCardFeatures"));
  const resumeCardDownload = String(
    formData.get("resumeCardDownload") ?? ""
  ).trim();
  const resumeCardFile = String(formData.get("resumeCardFile") ?? "").trim();

  const contactTitle = String(formData.get("contactTitle") ?? "").trim();
  const contactItems = toJsonArray(formData.get("contactItems"));
  const socialTitle = String(formData.get("socialTitle") ?? "").trim();
  const socialItems = toJsonArray(formData.get("socialItems"));

  if (
    !localeCode ||
    !subtitle ||
    !title ||
    !description ||
    !resumeCardTitle ||
    !resumeCardMeta ||
    !resumeCardDownload ||
    !resumeCardFile ||
    !contactTitle ||
    !socialTitle
  ) {
    throw new Error("All resume fields are required");
  }

  const data = {
    subtitle,
    title,
    description,
    resumeCard: {
      title: resumeCardTitle,
      meta: resumeCardMeta,
      features: resumeCardFeatures,
      downloadLabel: resumeCardDownload,
      fileUrl: resumeCardFile,
    },
    contactCard: {
      title: contactTitle,
      items: contactItems,
    },
    socialCard: {
      title: socialTitle,
      items: socialItems,
    },
  };

  await upsertSectionData({ key: "resume", localeCode, data });
  redirect(`/admin/builder/resume?locale=${localeCode}`);
}

export async function updateFooterSection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const navigation = toJsonArray(formData.get("navigation"));
  const socials = toJsonArray(formData.get("socials"));
  const builtWith = String(formData.get("builtWith") ?? "").trim();
  const copyright = String(formData.get("copyright") ?? "").trim();

  if (!localeCode || !tagline || !builtWith || !copyright) {
    throw new Error("Locale, tagline, builtWith, and copyright are required");
  }

  await upsertSectionData({
    key: "footer",
    localeCode,
    data: {
      tagline,
      navigation,
      socials,
      builtWith,
      copyright,
    },
  });
  redirect(`/admin/builder/footer?locale=${localeCode}`);
}

export async function updateLegalSection(
  key: "terms" | "privacy",
  formData: FormData
) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const updatedAt = String(formData.get("updatedAt") ?? "").trim();
  const sections = toJsonArray(formData.get("sections"));

  if (!localeCode || !title || !updatedAt) {
    throw new Error("Locale, title, and updated date are required");
  }

  await upsertSectionData({
    key,
    localeCode,
    data: { title, updatedAt, sections },
  });
  redirect(`/admin/builder/legal?locale=${localeCode}`);
}

export async function updateNotFoundSection(formData: FormData) {
  await requireAdmin();

  const localeCode = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const backToHome = String(formData.get("backToHome") ?? "").trim();

  if (!localeCode || !title || !description || !backToHome) {
    throw new Error("Locale, title, description, and backToHome are required");
  }

  await upsertSectionData({
    key: "notFound",
    localeCode,
    data: { title, description, backToHome },
  });
  redirect(`/admin/builder/not-found?locale=${localeCode}`);
}
