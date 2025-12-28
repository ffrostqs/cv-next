export const dynamic = "force-dynamic";

import { Hero } from "@/sections/hero/Hero";
import { About } from "@/sections/about/About";
import type { Locale } from "@/config/locales";
import { Experience } from "@/sections/experience/Experience";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Experience locale={locale} />
      <About locale={locale} variant="full" />
      <Projects locale={locale} />
      <Skills locale={locale} />
    </>
  );
}
