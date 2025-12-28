"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { SkillsModel } from "./skills.types";
import { SkillCategoryCard } from "./components/SkillCategoryCard";

export function SkillsClient({ skills }: { skills: SkillsModel }) {
  const { titleId, descriptionId } = useSectionIds("skills");

  return (
    <Section id="skills" variant="muted" className="py-32">
      <SectionHeader
        icon="skills"
        badge={skills.subtitle}
        title={skills.title}
        description={skills.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      <div className="grid md:grid-cols-2 gap-8">
        {skills.categories.map((category, index) => (
          <SkillCategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
