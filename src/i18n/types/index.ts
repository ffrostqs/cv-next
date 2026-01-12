export * from "./hero.types";
export * from "./experience.types";
export * from "./about.types";
export * from "./projects.types";
export * from "./skills.types";
export * from "./global.types";
export * from "./nav.types";
export * from "./resume.types";
export * from "./footer.types";
export * from "./legal.types";
export * from "./notFound.types";

import type { HeroDictionary } from "./hero.types";
import type { ExperienceDictionary } from "./experience.types";
import type { ProjectsDictionary } from "./projects.types";
import type { AboutDictionary } from "./about.types";
import type { GlobalDictionary } from "./global.types";
import type { NavDictionary } from "./nav.types";
import type { SkillsDictionary } from "./skills.types";
import type { ResumeDictionary } from "./resume.types";
import type { FooterDictionary } from "./footer.types";
import type { LegalDictionary } from "./legal.types";
import type { NotFoundDictionary } from "./notFound.types";
export interface Dictionary {
  hero: HeroDictionary;
  experience: ExperienceDictionary;
  projects: ProjectsDictionary;
  skills: SkillsDictionary;
  resume: ResumeDictionary;
  footer: FooterDictionary;

  about: {
    summary: AboutDictionary;
    full: AboutDictionary;
  };
  global: GlobalDictionary;
  nav: NavDictionary;
  terms: LegalDictionary;
  privacy: LegalDictionary;
  notFound: NotFoundDictionary;
}
