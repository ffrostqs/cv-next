import { useId } from "react";

type SectionIds = {
  sectionId?: string;
  titleId: string;
  descriptionId: string;
};

export function useSectionIds(baseId?: string): SectionIds {
  const reactId = useId();
  const resolvedBase = baseId ?? `section-${reactId}`;

  return {
    sectionId: baseId,
    titleId: `${resolvedBase}-title`,
    descriptionId: `${resolvedBase}-description`,
  };
}
