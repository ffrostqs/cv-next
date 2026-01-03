"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ResumeModel } from "./resume.types";
import { ResumeCard } from "./components/ResumeCard";
import { ContactCard } from "./components/ContactCard";
import { SocialCard } from "./components/SocialCard";

export function ResumeClient({ resume }: { resume: ResumeModel }) {
  const { titleId, descriptionId } = useSectionIds("resume");

  return (
    <Section id="resume" variant="muted" className="py-32">
      <SectionHeader
        icon="download"
        badge={resume.subtitle}
        title={resume.title}
        description={resume.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ResumeCard data={resume.resume} />
        <div className="grid gap-8 lg:grid-cols-1">
          <ContactCard data={resume.contact} />
          <SocialCard data={resume.socials} />
        </div>
      </div>
    </Section>
  );
}
