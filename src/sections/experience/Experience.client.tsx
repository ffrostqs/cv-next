// src/sections/experience/Experience.client.tsx
"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

import type { ExperienceModel } from "./experience.types";
import { experienceStyles as s } from "./experience.styles";
import { ExperienceTimelineItem } from "./components/ExperienceTimelineItem";
import { EXPERIENCE_SECTION_ID } from "./experience.config";

interface Props {
  experience: ExperienceModel;
}

export function ExperienceClient({ experience }: Props) {
  const { titleId, descriptionId } = useSectionIds(EXPERIENCE_SECTION_ID);

  return (
    <Section
      id={EXPERIENCE_SECTION_ID}
      variant="muted"
      glow
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={s.section}
    >
      <div className={s.root}>
        {/* Header */}
        <SectionHeader
          icon={EXPERIENCE_SECTION_ID}
          badge={experience.subtitle}
          title={experience.title}
          description={experience.description}
          titleId={titleId}
          descriptionId={descriptionId}
        />

        {/* Timeline */}
        <div className={s.timeline.wrapper}>
          <div aria-hidden className={s.timeline.line} />

          <ul className={s.timeline.list} role="list">
            {experience.items.map((item, index) => (
              <ExperienceTimelineItem
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
                techStackLabel={experience.techStack}
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
