import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/config/languages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];

  const routes = ["", "/terms", "/privacy"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const route of routes) {
      const path =
        locale === DEFAULT_LOCALE ? route || "/" : `/${locale}${route}`;

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
