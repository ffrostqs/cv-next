"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

import type { SkillsModel } from "./skills.types";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { skillsStyles as s } from "./skills.styles";
import { SKILLS_SECTION_ID } from "./skills.config";

export function SkillsClient({ skills }: { skills: SkillsModel }) {
  const { titleId, descriptionId } = useSectionIds(SKILLS_SECTION_ID);

  return (
    <Section
      id={SKILLS_SECTION_ID}
      variant="default"
      className={s.section}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <SectionHeader
        icon={SKILLS_SECTION_ID}
        badge={skills.subtitle}
        title={skills.title}
        description={skills.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      <div className={s.grid}>
        {skills.categories.map((cat, i) => (
          <SkillCategoryCard
            key={cat.id}
            category={cat}
            index={i}
            usage={skills.usage}
          />
        ))}
      </div>
    </Section>
  );
}
