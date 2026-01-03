// app/page.tsx
export const dynamic = "force-dynamic";

import type { Locale } from "@/config/locales";

import { Hero } from "@/sections/hero/Hero";
import { Experience } from "@/sections/experience/Experience";
import { About } from "@/sections/about/About";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
import { Resume } from "@/sections/resume/Resume";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <>
      <Hero locale={locale} />
      <Experience locale={locale} />
      <About locale={locale} variant="full" />
      <Projects locale={locale} />
      <Skills locale={locale} />
      <Resume locale={locale} />
    </>
  );
}
