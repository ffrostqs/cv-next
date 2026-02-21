"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { ResumeClient } from "@/sections/resume/Resume.client";
import type { ResumeModel } from "@/sections/resume/resume.types";
import type { IconName } from "@/icons/icon.types";

type ResumeProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  resume?: ResumeModel["resume"];
  contact?: ResumeModel["contact"];
  socials?: ResumeModel["socials"];
  downloadLabel?: string;
  fileUrl?: string;
  contactEmail?: string;
  contactLocation?: string;
};

const DEFAULT_RESUME: ResumeModel = {
  subtitle: "Resume",
  title: "Download",
  description: "Grab the PDF or reach out directly.",
  resume: {
    title: "Product Designer & Engineer",
    meta: "PDF · Updated 2026",
    features: ["Full-stack projects", "Design systems", "Leadership"],
    downloadLabel: "Download resume",
    fileUrl: "#",
  },
  contact: {
    title: "Contact",
    items: [
      { icon: "mail" as IconName, label: "Email", value: "hello@example.com" },
      { icon: "location" as IconName, label: "Location", value: "Remote" },
    ],
  },
  socials: {
    title: "Social",
    items: [
      { icon: "github" as IconName, label: "GitHub", url: "#" },
      { icon: "linkedin" as IconName, label: "LinkedIn", url: "#" },
    ],
  },
};

function ResumeSectionBlock({ block }: { block: Block }) {
  const props = block.props as ResumeProps;

  const legacyResume =
    props.downloadLabel || props.fileUrl
      ? {
          ...DEFAULT_RESUME.resume,
          downloadLabel: props.downloadLabel ?? DEFAULT_RESUME.resume.downloadLabel,
          fileUrl: props.fileUrl ?? DEFAULT_RESUME.resume.fileUrl,
        }
      : undefined;

  const legacyContact =
    props.contactEmail || props.contactLocation
      ? {
          ...DEFAULT_RESUME.contact,
          items: [
            {
              icon: "mail" as IconName,
              label: "Email",
              value: props.contactEmail ?? DEFAULT_RESUME.contact.items[0]?.value ?? "",
            },
            {
              icon: "location" as IconName,
              label: "Location",
              value:
                props.contactLocation ??
                DEFAULT_RESUME.contact.items[1]?.value ??
                "",
            },
          ],
        }
      : undefined;

  const resume: ResumeModel = {
    subtitle: props.subtitle ?? DEFAULT_RESUME.subtitle,
    title: props.title ?? DEFAULT_RESUME.title,
    description: props.description ?? DEFAULT_RESUME.description,
    resume: props.resume ?? legacyResume ?? DEFAULT_RESUME.resume,
    contact: props.contact ?? legacyContact ?? DEFAULT_RESUME.contact,
    socials: props.socials ?? DEFAULT_RESUME.socials,
  };

  return <ResumeClient resume={resume} />;
}

export default memo(ResumeSectionBlock);
