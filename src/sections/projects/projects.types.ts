import type { ProjectsDictionary } from "@/i18n/types";

/**
 * 1️⃣ Тип одного проекту — напряму з i18n
 */
export type ProjectItem = ProjectsDictionary["items"][number];

/**
 * 2️⃣ UI-модель секції
 */
export type ProjectsModel = Pick<
  ProjectsDictionary,
  "subtitle" | "title" | "description"
> & {
  items: ProjectItem[];
};
