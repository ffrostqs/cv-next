export const dynamic = "force-dynamic";

import type { Locale } from "@/config/languages";

import { Hero } from "@/sections/hero/Hero";
import { Experience } from "@/sections/experience/Experience";
import { About } from "@/sections/about/About";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
import { Resume } from "@/sections/resume/Resume";

/**
 * HomePage
 * Server component.
 * Used by both `/` and `/{locale}` routes.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      {/* HERO — identity */}
      <Hero locale={locale} />

      {/* EXPERIENCE — credibility */}
      <Experience locale={locale} />

      {/* ABOUT — trust */}
      <About locale={locale} variant="full" />

      {/* PROJECTS — proof */}
      <Projects locale={locale} />

      {/* SKILLS — confirmation */}
      <Skills locale={locale} />

      {/* RESUME — call to action */}
      <Resume locale={locale} />
    </>
  );
}
