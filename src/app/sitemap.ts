import type { MetadataRoute } from "next";
import { getLocales, getDefaultLocale } from "@/lib/locales";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];

  const routes = ["", "/terms", "/privacy"];

  const entries: MetadataRoute.Sitemap = [];
  const locales = await getLocales();
  const defaultLocale = await getDefaultLocale();

  for (const locale of locales) {
    for (const route of routes) {
      const path =
        locale.code === defaultLocale?.code ? route || "/" : `/${locale.code}${route}`;

      entries.push({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.6,
      });
    }
  }

  return entries;
}
