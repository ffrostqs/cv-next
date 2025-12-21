"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Section, useSectionIds } from "@/components/ui/section";
import { StatList } from "@/components/ui/stat-list";
import type { AboutModel } from "./about.types";
import { AboutApproach } from "./components/AboutApproach";

export function AboutClient({ about }: { about: AboutModel }) {
  const { titleId, descriptionId } = useSectionIds("about");

  return (
    <Section id="about" className="py-32">
      <SectionHeader
        icon="about"
        badge={about.subtitle}
        title={about.title}
        description={about.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      {about.stats && <StatList items={about.stats} className="mt-16" />}

      {about.approach && <AboutApproach approach={about.approach} />}
    </Section>
  );
}
