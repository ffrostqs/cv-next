// src/i18n/types.ts

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
      icon: string; // ✅ ТІЛЬКИ string
      label: string;
      value: string;
    }[];
  };

  socialCard: {
    title: string;
    items: {
      icon: string; // ✅ ТІЛЬКИ string
      label: string;
      url: string;
    }[];
  };
}
