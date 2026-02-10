import type { Dictionary } from "@/i18n/types";
import { Suspense } from "react";
import { Hero } from "@/sections/hero/Hero";
import { Experience } from "@/sections/experience/Experience";
import { About } from "@/sections/about/About";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
import { Resume } from "@/sections/resume/Resume";
import { adaptHeroFromI18n } from "@/sections/hero/hero.adapter";
import { adaptExperienceFromI18n } from "@/sections/experience/experience.adapter";
import { adaptAbout } from "@/sections/about/about.adapter";
import { adaptProjects } from "@/sections/projects/projects.adapter";
import { adaptSkills } from "@/sections/skills/skills.adapter";
import { adaptResume } from "@/sections/resume/resume.adapter";
import { calculateSkillUsage } from "@/domain/skills/skill-usage";

/**
 * HomePage
 * Server component.
 */
export function HomePage({ dictionary }: { dictionary: Dictionary }) {
  const hero = adaptHeroFromI18n(dictionary.hero);
  const experience = adaptExperienceFromI18n(dictionary.experience);
  const about = adaptAbout(dictionary.about.full);
  const projects = adaptProjects(dictionary.projects);
  const skills = {
    ...adaptSkills(dictionary.skills),
    usage: calculateSkillUsage(projects.items),
  };
  const resume = adaptResume(dictionary.resume);

  return (
    <>
      <Hero hero={hero} />
      <Experience experience={experience} />
      <About about={about} />
      <Suspense fallback={null}>
        <Projects projects={projects} />
      </Suspense>
      <Skills skills={skills} />
      <Resume resume={resume} />
    </>
  );
}
