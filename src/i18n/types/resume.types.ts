import type { IconName } from "@/icons/icon.types";

export interface ResumeDictionary {
  subtitle: string;
  title: string;
  description: string;

  resumeCard: {
    title: string;
    meta: string;
    features: string[];
    downloadLabel: string;
    fileUrl: string;
  };

  contactCard: {
    title: string;
    items: {
      id: string;
      icon: IconName;
      label: string;
      value: string;
    }[];
  };

  socialCard: {
    title: string;
    items: {
      id: string;
      icon: IconName;
      label: string;
      url: string;
    }[];
  };
}
