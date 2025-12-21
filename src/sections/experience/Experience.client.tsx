"use client";

/**
 * Experience section
 * Uses shared SectionHeader and feature-level TimelineItem
 */

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBackground } from "@/components/ui/section-background";

import type { ExperienceModel } from "./experience.types";
import { experienceStyles as s } from "./experience.styles";
import { ExperienceTimelineItem } from "./components/ExperienceTimelineItem";

interface Props {
  experience: ExperienceModel;
}

export function ExperienceClient({ experience }: Props) {
  const { titleId, descriptionId } = useSectionIds("experience");

  return (
    <Section
      id="experience"
      variant="muted"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-testid="experience-section"
    >
      {/* Decorative background */}
      <SectionBackground />

      <div className="relative z-10">
        {/* Section header */}
        <SectionHeader
          icon="experience"
          badge={experience.subtitle}
          title={experience.title}
          description={experience.description}
          titleId={titleId}
          descriptionId={descriptionId}
        />

        {/* Timeline */}
        <div className={s.timeline.wrapper}>
          <div aria-hidden className={s.timeline.line} />

          <ul className={s.timeline.list}>
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
