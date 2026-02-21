import { z } from "zod";
import { registerBlock } from "./registry";
import { HERO_SOCIALS } from "@/sections/hero/hero.config";

registerBlock({
  type: "text",
  title: "Text",
  description: "Rich text block with headings, lists, and links.",
  category: "Content",
  version: "1.0.0",
  keywords: ["rich text", "paragraph", "copy", "editor"],
  load: () => import("@/components/blocks/TextBlock"),
  schema: z.object({
    content: z.any(),
  }),
});

registerBlock({
  type: "section",
  title: "Section",
  description: "Structured section header with title and subtitle.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["hero", "section", "intro", "heading"],
  defaults: {
    eyebrow: "Section",
    title: "Section title",
    subtitle: "Add a short supporting description.",
    align: "left",
    tone: "default",
  },
  load: () => import("@/components/blocks/SectionBlock"),
  schema: z.object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    align: z.enum(["left", "center"]).optional(),
    tone: z.enum(["default", "muted"]).optional(),
  }),
});

registerBlock({
  type: "template:section",
  title: "Section Layout",
  description: "Container for blocks with optional columns.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["layout", "container", "columns"],
});

registerBlock({
  type: "template:hero",
  title: "Hero Layout",
  description: "Two-column hero with image, headline, and CTAs.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["hero", "intro", "cta"],
});

registerBlock({
  type: "template:about",
  title: "About Layout",
  description: "Intro copy with highlights or stats.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["about", "bio", "summary"],
});

registerBlock({
  type: "template:experience",
  title: "Experience Layout",
  description: "Role cards with supporting summary.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["experience", "career", "timeline"],
});

registerBlock({
  type: "template:projects",
  title: "Projects Layout",
  description: "Project cards with description.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["projects", "portfolio", "case studies"],
});

registerBlock({
  type: "template:skills",
  title: "Skills Layout",
  description: "Skills summary with list.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["skills", "tools"],
});

registerBlock({
  type: "template:resume",
  title: "Resume Layout",
  description: "Resume download and highlights.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["resume", "cv"],
});

registerBlock({
  type: "template:footer",
  title: "Footer Layout",
  description: "Footer links and copyright.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["footer", "links"],
});

registerBlock({
  type: "hero-media",
  title: "Hero Media",
  description: "Hero portrait with availability badge.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "image", "portrait"],
  defaults: {
    src: "/images/portrait.png",
    alt: "Portrait",
    badgeAvailable: "Available",
    badgeRemote: "Remote",
    badgeStatus: "available",
    showBadge: true,
    objectPosition: "50% 20%",
  },
  load: () => import("@/components/blocks/HeroMediaBlock"),
  schema: z.object({
    src: z.string().optional(),
    alt: z.string().optional(),
    badgeAvailable: z.string().optional(),
    badgeRemote: z.string().optional(),
    badgeStatus: z.enum(["available", "busy"]).optional(),
    showBadge: z.boolean().optional(),
    objectPosition: z.string().optional(),
  }),
});

registerBlock({
  type: "hero-location",
  title: "Hero Location",
  description: "Location pill badge.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "location"],
  defaults: {
    location: "Remote",
  },
  load: () => import("@/components/blocks/HeroLocationBlock"),
  schema: z.object({
    location: z.string().optional(),
  }),
});

registerBlock({
  type: "hero-title",
  title: "Hero Title",
  description: "Primary hero headline.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "headline"],
  defaults: {
    greeting: "Hello, I am",
    name: "Your Name",
  },
  load: () => import("@/components/blocks/HeroTitleBlock"),
  schema: z.object({
    greeting: z.string().optional(),
    name: z.string().optional(),
  }),
});

registerBlock({
  type: "hero-subtitle",
  title: "Hero Subtitle",
  description: "Secondary hero title.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "subtitle"],
  defaults: {
    text: "Product Designer + Engineer",
  },
  load: () => import("@/components/blocks/HeroSubtitleBlock"),
  schema: z.object({
    text: z.string().optional(),
  }),
});

registerBlock({
  type: "hero-description",
  title: "Hero Description",
  description: "Hero supporting paragraph.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "description"],
  defaults: {
    text: "Crafting digital experiences with clarity, speed, and intent.",
  },
  load: () => import("@/components/blocks/HeroDescriptionBlock"),
  schema: z.object({
    text: z.string().optional(),
  }),
});

registerBlock({
  type: "hero-cta",
  title: "Hero CTA",
  description: "Primary and secondary hero buttons.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "button", "cta"],
  defaults: {
    primaryLabel: "Contact",
    primaryHref: "#contact",
    secondaryLabel: "View resume",
    secondaryHref: "#resume",
    secondaryIcon: "download",
  },
  load: () => import("@/components/blocks/HeroCtaBlock"),
  schema: z.object({
    primaryLabel: z.string().optional(),
    primaryHref: z.string().optional(),
    secondaryLabel: z.string().optional(),
    secondaryHref: z.string().optional(),
    secondaryIcon: z.string().optional(),
  }),
});

registerBlock({
  type: "hero-socials",
  title: "Hero Socials",
  description: "Social links row.",
  category: "Content",
  version: "1.0.0",
  keywords: ["hero", "socials"],
  defaults: {
    items: HERO_SOCIALS,
  },
  load: () => import("@/components/blocks/HeroSocialsBlock"),
  schema: z.object({
    items: z
      .array(
        z.object({
          href: z.string(),
          icon: z.string(),
          label: z.string(),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "buttons",
  title: "Buttons",
  description: "Button group with multiple actions.",
  category: "Content",
  version: "1.0.0",
  keywords: ["cta", "button", "actions"],
  defaults: {
    align: "left",
    size: "md",
    items: [
      { label: "Contact", href: "#contact", variant: "primary" },
      { label: "View resume", href: "#resume", variant: "outline", iconLeft: "download" },
    ],
  },
  load: () => import("@/components/blocks/ButtonsBlock"),
  schema: z.object({
    align: z.enum(["left", "center"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    items: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          variant: z.enum(["primary", "outline", "ghost"]).optional(),
          iconLeft: z.string().optional(),
          iconRight: z.string().optional(),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "socials",
  title: "Social Links",
  description: "Social network links list.",
  category: "Content",
  version: "1.0.0",
  keywords: ["social", "links"],
  defaults: {
    align: "left",
    variant: "inline",
    items: HERO_SOCIALS,
  },
  load: () => import("@/components/blocks/SocialsBlock"),
  schema: z.object({
    align: z.enum(["left", "center"]).optional(),
    variant: z.enum(["inline", "card"]).optional(),
    items: z
      .array(
        z.object({
          href: z.string(),
          icon: z.string(),
          label: z.string(),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "image",
  title: "Image",
  description: "Single image with optional caption.",
  category: "Media",
  version: "1.0.0",
  keywords: ["photo", "media", "visual"],
  defaults: {
    src: "",
    alt: "",
    caption: "",
    fit: "cover",
  },
  load: () => import("@/components/blocks/ImageBlock"),
  schema: z.object({
    src: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    fit: z.enum(["cover", "contain"]).optional(),
  }),
});

registerBlock({
  type: "spacer",
  title: "Spacer",
  description: "Adjustable vertical spacing block.",
  category: "Layout",
  version: "1.0.0",
  keywords: ["space", "gap", "layout"],
  defaults: {
    height: 48,
    unit: "px",
  },
  load: () => import("@/components/blocks/SpacerBlock"),
  schema: z.object({
    height: z.number().min(0).max(600).optional(),
    unit: z.enum(["px", "vh"]).optional(),
  }),
});

registerBlock({
  type: "heading",
  title: "Heading",
  description: "Single heading with optional eyebrow text.",
  category: "Content",
  version: "1.0.0",
  keywords: ["title", "headline"],
  defaults: {
    eyebrow: "",
    text: "Heading",
    level: 2,
    align: "left",
  },
  load: () => import("@/components/blocks/HeadingBlock"),
  schema: z.object({
    eyebrow: z.string().optional(),
    text: z.string().optional(),
    level: z.number().min(1).max(4).optional(),
    align: z.enum(["left", "center"]).optional(),
  }),
});

registerBlock({
  type: "button",
  title: "Button",
  description: "Call-to-action button with variants.",
  category: "Content",
  version: "1.0.0",
  keywords: ["cta", "action", "link"],
  defaults: {
    label: "Button",
    href: "",
    variant: "primary",
    size: "md",
    align: "left",
  },
  load: () => import("@/components/blocks/ButtonBlock"),
  schema: z.object({
    label: z.string().optional(),
    href: z.string().optional(),
    variant: z.enum(["primary", "outline", "ghost"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    align: z.enum(["left", "center"]).optional(),
  }),
});

registerBlock({
  type: "link",
  title: "Link",
  description: "Inline text link.",
  category: "Content",
  version: "1.0.0",
  keywords: ["anchor", "href"],
  defaults: {
    label: "Link",
    href: "#",
    target: "_self",
  },
  load: () => import("@/components/blocks/LinkBlock"),
  schema: z.object({
    label: z.string().optional(),
    href: z.string().optional(),
    target: z.enum(["_self", "_blank"]).optional(),
  }),
});

registerBlock({
  type: "divider",
  title: "Divider",
  description: "Horizontal divider line.",
  category: "Layout",
  version: "1.0.0",
  keywords: ["separator", "rule"],
  defaults: {
    style: "solid",
    spacing: "md",
  },
  load: () => import("@/components/blocks/DividerBlock"),
  schema: z.object({
    style: z.enum(["solid", "dashed"]).optional(),
    spacing: z.enum(["sm", "md", "lg"]).optional(),
  }),
});

registerBlock({
  type: "card",
  title: "Card",
  description: "Content card with optional image and CTA.",
  category: "Content",
  version: "1.0.0",
  keywords: ["tile", "feature", "cta"],
  defaults: {
    eyebrow: "Card",
    title: "Card title",
    body: "Add supporting copy for this card.",
    imageUrl: "",
    ctaLabel: "Learn more",
    ctaHref: "",
    tone: "default",
  },
  load: () => import("@/components/blocks/CardBlock"),
  schema: z.object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    body: z.string().optional(),
    imageUrl: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    tone: z.enum(["default", "muted"]).optional(),
  }),
});

registerBlock({
  type: "list",
  title: "List",
  description: "Bullet list with title.",
  category: "Content",
  version: "1.0.0",
  keywords: ["bullets", "items"],
  defaults: {
    title: "List",
    items: ["First item", "Second item", "Third item"],
  },
  load: () => import("@/components/blocks/ListBlock"),
  schema: z.object({
    title: z.string().optional(),
    items: z.array(z.string()).optional(),
  }),
});

registerBlock({
  type: "quote",
  title: "Quote",
  description: "Testimonial quote block.",
  category: "Content",
  version: "1.0.0",
  keywords: ["testimonial", "review"],
  defaults: {
    quote: "A short testimonial or quote goes here.",
    author: "John Doe",
    role: "Founder",
  },
  load: () => import("@/components/blocks/QuoteBlock"),
  schema: z.object({
    quote: z.string().optional(),
    author: z.string().optional(),
    role: z.string().optional(),
  }),
});

registerBlock({
  type: "stats",
  title: "Stats",
  description: "Highlight key metrics.",
  category: "Content",
  version: "1.0.0",
  keywords: ["metrics", "numbers"],
  defaults: {
    title: "Key stats",
    columns: 3,
    stats: [
      { label: "Projects", value: "24" },
      { label: "Years", value: "8+" },
      { label: "Clients", value: "12" },
    ],
  },
  load: () => import("@/components/blocks/StatsBlock"),
  schema: z.object({
    title: z.string().optional(),
    columns: z.number().min(1).max(4).optional(),
    stats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "form",
  title: "Form",
  description: "Contact form layout.",
  category: "Content",
  version: "1.0.0",
  keywords: ["contact", "lead", "input"],
  defaults: {
    title: "Contact form",
    description: "Let visitors reach you fast.",
    submitLabel: "Send message",
    action: "",
    method: "post",
  },
  load: () => import("@/components/blocks/FormBlock"),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    submitLabel: z.string().optional(),
    action: z.string().optional(),
    method: z.enum(["post", "get"]).optional(),
  }),
});

registerBlock({
  type: "hero",
  title: "Hero",
  description: "Hero section with CTA buttons.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["intro", "landing", "cta"],
  defaults: {
    greeting: "Hello, I am",
    name: "Your Name",
    title: "Product Designer + Engineer",
    description: "Crafting digital experiences with clarity, speed, and intent.",
    getInTouch: "Contact",
    resume: "View resume",
    resumeUrl: "",
    location: "Lviv, Ukraine",
    badgeAvailable: "Available",
    badgeRemote: "Remote",
  },
  load: () => import("@/components/blocks/HeroSectionBlock"),
  schema: z.object({
    greeting: z.string().optional(),
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    getInTouch: z.string().optional(),
    resume: z.string().optional(),
    resumeUrl: z.string().optional(),
    primaryLabel: z.string().optional(),
    secondaryLabel: z.string().optional(),
    secondaryHref: z.string().optional(),
    location: z.string().optional(),
    badgeAvailable: z.string().optional(),
    badgeRemote: z.string().optional(),
  }),
});

registerBlock({
  type: "about",
  title: "About",
  description: "About section with highlights.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["bio", "mission", "summary"],
  defaults: {
    subtitle: "Summary",
    title: "Designing products with clarity.",
    description: "Describe your background, mission, or what makes you different.",
    stats: [
      {
        id: "years",
        icon: "experience",
        value: "8+",
        label: "Years",
        description: "Product & engineering",
      },
      {
        id: "projects",
        icon: "projects",
        value: "24",
        label: "Projects",
        description: "Delivered end-to-end",
      },
      {
        id: "tools",
        icon: "tools",
        value: "15+",
        label: "Tools",
        description: "Design & dev stack",
      },
    ],
    approach: {
      title: "Approach",
      items: [
        {
          icon: "frontend",
          title: "Product strategy",
          description: "Clarify the outcome and shape the narrative.",
        },
        {
          icon: "architecture",
          title: "System thinking",
          description: "Design scalable flows, not isolated screens.",
        },
        {
          icon: "backend",
          title: "Execution",
          description: "Bridge design and engineering for fast delivery.",
        },
      ],
    },
  },
  load: () => import("@/components/blocks/AboutSectionBlock"),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    stats: z
      .array(
        z.object({
          id: z.string(),
          icon: z.string(),
          value: z.string(),
          label: z.string(),
          description: z.string().optional(),
        })
      )
      .optional(),
    approach: z
      .object({
        title: z.string().optional(),
        items: z
          .array(
            z.object({
              icon: z.string(),
              title: z.string(),
              description: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    highlights: z.array(z.string()).optional(),
  }),
});

registerBlock({
  type: "experience",
  title: "Experience",
  description: "Experience timeline section.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["career", "roles"],
  defaults: {
    title: "Experience",
    subtitle: "Selected roles",
    description: "Highlights from recent roles and responsibilities.",
    techStack: "Tech stack",
    items: [
      {
        id: "exp-1",
        role: "Lead Product Designer",
        company: "Studio Alpha",
        companyUrl: "https://example.com",
        period: "2021 — Present",
        description: "Led cross-functional teams to ship new fintech experiences.",
        achievements: ["Improved activation by 30%", "Shipped 4 major releases"],
        stack: ["Figma", "React", "Node.js"],
        icon: "experience",
      },
      {
        id: "exp-2",
        role: "Senior Designer",
        company: "Nova Labs",
        companyUrl: "https://example.com",
        period: "2018 — 2021",
        description: "Scaled design systems and UX for B2B platforms.",
        achievements: ["Built design system", "Introduced user research cadence"],
        stack: ["TypeScript", "Next.js", "Storybook"],
        icon: "projects",
      },
    ],
  },
  load: () => import("@/components/blocks/ExperienceSectionBlock"),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    techStack: z.string().optional(),
    items: z
      .array(
        z.object({
          id: z.string().optional(),
          role: z.string(),
          company: z.string(),
          companyUrl: z.string().optional(),
          period: z.string(),
          description: z.string(),
          achievements: z.array(z.string()).optional(),
          stack: z.array(z.string()).optional(),
          icon: z.string().optional(),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "projects",
  title: "Projects",
  description: "Project gallery section.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["portfolio", "case studies"],
  defaults: {
    title: "Projects",
    subtitle: "Case studies",
    description: "Selected work showcasing strategy, design, and delivery.",
    items: [
      {
        id: 1,
        title: "Analytics Dashboard",
        category: "Fintech",
        meta: "2024",
        description: "Real-time dashboards for executive reporting.",
        image: "",
        impact: ["Reduced reporting time by 40%"],
        problem: "Fragmented reporting data",
        solution: "Unified metrics platform",
        result: "Faster executive decisions",
        stack: ["React", "TypeScript", "Postgres"],
        links: [{ id: "demo", label: "Demo", url: "#", icon: "demo" }],
      },
      {
        id: 2,
        title: "Marketplace Redesign",
        category: "E-commerce",
        meta: "2023",
        description: "Boosted conversion with new onboarding flow.",
        image: "",
        impact: ["+18% conversion"],
        problem: "High drop-off",
        solution: "Streamlined onboarding",
        result: "More activated sellers",
        stack: ["Next.js", "Stripe", "Prisma"],
        links: [{ id: "case", label: "Case study", url: "#", icon: "demo" }],
      },
    ],
  },
  load: () => import("@/components/blocks/ProjectsSectionBlock"),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    items: z
      .array(
        z.object({
          id: z.number().optional(),
          title: z.string(),
          category: z.string(),
          description: z.string(),
          meta: z.string().optional(),
          image: z.string().optional(),
          impact: z.array(z.string()).optional(),
          problem: z.string().optional(),
          solution: z.string().optional(),
          result: z.string().optional(),
          stack: z.array(z.string()).optional(),
          links: z
            .array(
              z.object({
                id: z.string().optional(),
                label: z.string(),
                url: z.string(),
                icon: z.string().optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "skills",
  title: "Skills",
  description: "Skills overview section.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["stack", "tools"],
  defaults: {
    title: "Skills",
    subtitle: "Focus",
    description: "Core competencies and tools in daily use.",
    focusAreas: {
      title: "Focus areas",
      items: [
        {
          id: "fa-1",
          icon: "frontend",
          title: "Product UX",
          description: "User flows, prototyping, testing.",
        },
        {
          id: "fa-2",
          icon: "backend",
          title: "Engineering",
          description: "Full-stack delivery with clean architecture.",
        },
        {
          id: "fa-3",
          icon: "tools",
          title: "Systems",
          description: "Design systems and tooling.",
        },
      ],
    },
    categories: [
      {
        id: "cat-1",
        icon: "frontend",
        title: "Design",
        description: "UX/UI systems",
        skills: ["Figma", "Design systems", "Prototyping"],
      },
      {
        id: "cat-2",
        icon: "backend",
        title: "Engineering",
        description: "Product build",
        skills: ["React", "Next.js", "Node.js"],
      },
    ],
  },
  load: () => import("@/components/blocks/SkillsSectionBlock"),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    focusAreas: z
      .object({
        title: z.string().optional(),
        items: z
          .array(
            z.object({
              id: z.string().optional(),
              icon: z.string(),
              title: z.string(),
              description: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    categories: z
      .array(
        z.object({
          id: z.string().optional(),
          icon: z.string().optional(),
          title: z.string(),
          description: z.string().optional(),
          skills: z.array(z.string()),
        })
      )
      .optional(),
  }),
});

registerBlock({
  type: "resume",
  title: "Resume",
  description: "Resume download section.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["cv", "download"],
  defaults: {
    title: "Download",
    subtitle: "Resume",
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
        { icon: "mail", label: "Email", value: "hello@example.com" },
        { icon: "location", label: "Location", value: "Remote" },
      ],
    },
    socials: {
      title: "Social",
      items: [
        { icon: "github", label: "GitHub", url: "#" },
        { icon: "linkedin", label: "LinkedIn", url: "#" },
      ],
    },
  },
  load: () => import("@/components/blocks/ResumeSectionBlock"),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    resume: z
      .object({
        title: z.string().optional(),
        meta: z.string().optional(),
        features: z.array(z.string()).optional(),
        downloadLabel: z.string().optional(),
        fileUrl: z.string().optional(),
      })
      .optional(),
    contact: z
      .object({
        title: z.string().optional(),
        items: z
          .array(
            z.object({
              icon: z.string(),
              label: z.string(),
              value: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    socials: z
      .object({
        title: z.string().optional(),
        items: z
          .array(
            z.object({
              icon: z.string(),
              label: z.string(),
              url: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
  }),
});

registerBlock({
  type: "footer",
  title: "Footer",
  description: "Footer section with links.",
  category: "Sections",
  version: "1.0.0",
  keywords: ["links", "bottom"],
  defaults: {
    tagline: "Let’s build something great together.",
    navigation: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    socials: [
      { label: "GitHub", href: "#", icon: "github" },
      { label: "LinkedIn", href: "#", icon: "linkedin" },
      { label: "Email", href: "#", icon: "mail" },
    ],
    meta: {
      copyright: "© 2026 Your Name",
      builtWith: "Built with Next.js",
    },
  },
  load: () => import("@/components/blocks/FooterSectionBlock"),
  schema: z.object({
    tagline: z.string().optional(),
    navigation: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          icon: z.string().optional(),
        })
      )
      .optional(),
    socials: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          icon: z.string().optional(),
        })
      )
      .optional(),
    meta: z
      .object({
        copyright: z.string().optional(),
        builtWith: z.string().optional(),
      })
      .optional(),
  }),
});
