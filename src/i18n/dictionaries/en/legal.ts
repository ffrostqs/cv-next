import type { LegalDictionary } from "../../types/legal.types";

export const terms: LegalDictionary = {
  title: "Terms of Service",
  updatedAt: "Last updated: January 2026",

  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
        "If you do not agree with any part of these terms, you should discontinue use of the website immediately.",
      ],
    },

    {
      id: "purpose",
      title: "Purpose of the Website",
      paragraphs: [
        "This website serves as a personal portfolio and professional presentation.",
        "All content is provided for informational and demonstrational purposes only.",
      ],
    },

    {
      id: "intellectual-property",
      title: "Intellectual Property",
      paragraphs: [
        "Unless otherwise stated, all content on this website, including text, design, code samples, and visual materials, is the intellectual property of the website owner.",
        "You may not reproduce, distribute, or use any content for commercial purposes without prior written consent.",
      ],
    },

    {
      id: "liability",
      title: "Limitation of Liability",
      paragraphs: [
        "This website is provided on an “as is” and “as available” basis without warranties of any kind.",
        "The website owner shall not be held liable for any direct or indirect damages resulting from the use or inability to use this website.",
      ],
    },

    {
      id: "changes",
      title: "Changes to the Terms",
      paragraphs: [
        "These Terms of Service may be updated from time to time without prior notice.",
        "Continued use of the website after changes constitutes acceptance of the updated terms.",
      ],
    },
  ],
};

export const privacy: LegalDictionary = {
  title: "Privacy Policy",
  updatedAt: "Last updated: January 2026",

  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "Your privacy is important. This website is designed to respect user privacy and collect as little data as possible.",
        "No personal data is collected automatically when browsing this website.",
      ],
    },

    {
      id: "data-collection",
      title: "Personal Data",
      paragraphs: [
        "This website does not use registration forms or user accounts.",
        "Any personal information shared through direct contact (for example, via email) is provided voluntarily and used solely for communication purposes.",
      ],
    },

    {
      id: "cookies",
      title: "Cookies and Local Storage",
      paragraphs: [
        "Cookies or local storage may be used only to support essential functionality, such as remembering theme preferences.",
        "No tracking, analytics, or advertising cookies are used on this website.",
      ],
    },

    {
      id: "third-parties",
      title: "Third-Party Links",
      paragraphs: [
        "This website may contain links to third-party platforms such as GitHub or LinkedIn.",
        "The website owner is not responsible for the privacy practices or content of external websites.",
      ],
    },

    {
      id: "updates",
      title: "Policy Updates",
      paragraphs: [
        "This Privacy Policy may be updated occasionally to reflect changes in the website or legal requirements.",
        "Any updates will be reflected on this page with a revised update date.",
      ],
    },
  ],
};
