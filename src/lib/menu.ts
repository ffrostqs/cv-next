import { prisma } from "@/lib/prisma";

export async function getMenuItems(locale: string, key = "main") {
  const items = await prisma.menuItem.findMany({
    where: {
      menu: { key },
      parentId: null,
      isActiveGlobal: true,
    },
    orderBy: { order: "asc" },
    include: {
      labels: {
        where: { locale: { code: locale }, isActive: true },
      },
    },
  });

  return items
    .filter((item) => item.labels.length > 0)
    .map((item) => ({
      id: item.id,
      href: item.href,
      label: item.labels[0]?.label ?? item.href,
    }));
}
