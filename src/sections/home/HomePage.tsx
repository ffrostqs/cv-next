// src/sections/home/HomePage.tsx
export const dynamic = "force-dynamic";

import { Hero } from "@/sections/hero/Hero";
import { Experience } from "@/sections/experience/Experience";
import { About } from "@/sections/about/About";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
import { Resume } from "@/sections/resume/Resume";

/**
 * HomePage
 * Server component.
 * Locale is resolved via LanguageProvider (context).
 */
export async function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <About variant="full" />
      <Projects />
      <Skills />
      <Resume />
    </>
  );
}
