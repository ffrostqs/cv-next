"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ResumeModel } from "./resume.types";
import { ResumeCard } from "./components/ResumeCard";
import { ContactCard } from "./components/ContactCard";
import { SocialCard } from "./components/SocialCard";
import { resumeStyles as s } from "./resume.styles";

export function ResumeClient({ resume }: { resume: ResumeModel }) {
  const { titleId, descriptionId } = useSectionIds("resume");

  return (
    <Section id="resume" variant="muted" glow className={s.section}>
      <SectionHeader
        icon="download"
        badge={resume.subtitle}
        title={resume.title}
        description={resume.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      <div className={s.grid}>
        <ResumeCard data={resume.resume} />

        <div className={s.side}>
          <ContactCard data={resume.contact} />
          <SocialCard data={resume.socials} />
        </div>
      </div>
    </Section>
  );
}
