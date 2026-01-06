// src/sections/about/About.client.tsx
"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { StatList } from "@/components/ui/stat-list";

import type { AboutModel } from "./about.types";
import { aboutStyles as s } from "./about.styles";
import { AboutApproach } from "./components/AboutApproach";
import { ABOUT_SECTION_ID } from "./about.config";

interface Props {
  about: AboutModel;
}

export function AboutClient({ about }: Props) {
  const { titleId, descriptionId } = useSectionIds(ABOUT_SECTION_ID);

  return (
    <Section
      id={ABOUT_SECTION_ID}
      variant="default"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className={s.root}>
        <SectionHeader
          icon={ABOUT_SECTION_ID}
          badge={about.subtitle}
          title={about.title}
          description={about.description}
          titleId={titleId}
          descriptionId={descriptionId}
        />

        {about.stats && <StatList items={about.stats} className={s.stats} />}

        {about.approach && <AboutApproach approach={about.approach} />}
      </div>
    </Section>
  );
}
