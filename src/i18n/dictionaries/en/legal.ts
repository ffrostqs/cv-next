import type { LegalDictionary } from "../../types/legal.types";

export const terms: LegalDictionary = {
  title: "Terms of Service",
  updatedAt: "Last updated: January 2026",

  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing or using this website, you agree to be bound by these Terms of Service.",
        "If you do not agree with any part of the terms, you must discontinue use of the website.",
      ],
    },
    {
      id: "use",
      title: "Use of Content",
      paragraphs: [
        "All content on this website is provided for informational purposes only.",
        "You may not use any content for commercial purposes without explicit permission.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      paragraphs: [
        "The website is provided “as is” without warranties of any kind.",
        "I shall not be liable for any damages arising from the use of this website.",
      ],
    },
  ],
};

export const privacy: LegalDictionary = {
  title: "Privacy Policy",
  updatedAt: "Last updated: January 2026",

  sections: [
    {
      id: "collection",
      title: "Information Collection",
      paragraphs: [
        "This website does not actively collect personal data.",
        "Any information provided via direct contact is voluntary.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      paragraphs: [
        "Cookies may be used only for essential functionality such as theme preferences.",
        "No tracking or advertising cookies are used.",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      paragraphs: [
        "This website may contain links to third-party services.",
        "I am not responsible for the privacy practices of external websites.",
      ],
    },
  ],
};
