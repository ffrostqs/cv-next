import type { ReactNode } from "react";
import type { Block } from "@/lib/blocks";
import type { PageContent } from "@/lib/editor/page-content";
import type { LayoutNode } from "@/lib/editor/layout-tree";
import { cn } from "@/components/ui/utils";
import { Section } from "@/components/ui/section/Section";
import { Hero } from "@/sections/hero/Hero";
import type { HeroModel } from "@/sections/hero/hero.types";
import { About } from "@/sections/about/About";
import type { AboutModel } from "@/sections/about/about.types";
import { Experience } from "@/sections/experience/Experience";
import type { ExperienceModel } from "@/sections/experience/experience.types";
import { Projects } from "@/sections/projects/Projects";
import type { ProjectsModel, ProjectsListItemModel } from "@/sections/projects/projects.types";
import { Skills } from "@/sections/skills/Skills";
import type { SkillsModel } from "@/sections/skills/skills.types";
import { Resume } from "@/sections/resume/Resume";
import type { ResumeModel } from "@/sections/resume/resume.types";
import { Footer } from "@/components/footer/Footer";
import type { FooterModel } from "@/components/footer/footer.types";
import HeroMediaBlock from "@/components/blocks/HeroMediaBlock";
import HeroLocationBlock from "@/components/blocks/HeroLocationBlock";
import HeroTitleBlock from "@/components/blocks/HeroTitleBlock";
import HeroSubtitleBlock from "@/components/blocks/HeroSubtitleBlock";
import HeroDescriptionBlock from "@/components/blocks/HeroDescriptionBlock";
import HeroCtaBlock from "@/components/blocks/HeroCtaBlock";
import HeroSocialsBlock from "@/components/blocks/HeroSocialsBlock";
import ButtonsBlock from "@/components/blocks/ButtonsBlock";
import SocialsBlock from "@/components/blocks/SocialsBlock";

type ProseNode = {
  type?: string;
  text?: string;
  content?: ProseNode[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  attrs?: Record<string, unknown>;
};

function applyMarks(text: string, marks?: ProseNode["marks"]) {
  if (!marks || marks.length === 0) return text;
  return marks.reduce<ReactNode>((acc, mark) => {
    if (mark.type === "bold") return <strong>{acc}</strong>;
    if (mark.type === "italic") return <em>{acc}</em>;
    if (mark.type === "link") {
      const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
      return (
        <a href={href} className="text-[color:var(--color-primary)] underline">
          {acc}
        </a>
      );
    }
    return acc;
  }, text);
}

function renderProseNode(node: ProseNode, key: string): ReactNode {
  const children = node.content?.map((child, index) =>
    renderProseNode(child, `${key}-${index}`)
  );

  switch (node.type) {
    case "doc":
      return <>{children}</>;
    case "paragraph":
      return (
        <p key={key} className="leading-7 text-[color:var(--text-primary)]">
          {children}
        </p>
      );
    case "heading": {
      const level = typeof node.attrs?.level === "number" ? node.attrs.level : 2;
      const Tag = (`h${Math.min(Math.max(level, 1), 3)}` as keyof JSX.IntrinsicElements);
      return (
        <Tag key={key} className="mt-6 text-2xl font-semibold">
          {children}
        </Tag>
      );
    }
    case "bulletList":
      return (
        <ul key={key} className="list-disc space-y-2 pl-6">
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={key} className="list-decimal space-y-2 pl-6">
          {children}
        </ol>
      );
    case "listItem":
      return <li key={key}>{children}</li>;
    case "hardBreak":
      return <br key={key} />;
    case "text":
      return <span key={key}>{applyMarks(node.text ?? "", node.marks)}</span>;
    default:
      return children ? <span key={key}>{children}</span> : null;
  }
}

function renderTextBlock(block: Block) {
  const content = block.props?.content as ProseNode | undefined;
  if (!content) {
    return (
      <p className="text-sm text-[color:var(--text-secondary)]">
        (Empty text block)
      </p>
    );
  }
  return (
    <div className="space-y-4">{renderProseNode(content, block.id)}</div>
  );
}

function renderSectionBlock(block: Block) {
  const props = block.props as {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    align?: "left" | "center";
    tone?: "default" | "muted";
  };
  const align = props.align ?? "left";
  const tone = props.tone ?? "default";
  const title = props.title ?? "Section title";
  const subtitle = props.subtitle ?? "";
  const eyebrow = props.eyebrow ?? "Section";

  return (
    <section
      className={cn(
        "rounded-3xl border border-white/10 px-6 py-8",
        tone === "muted" ? "bg-white/5" : "bg-white/10"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          align === "center" ? "items-center text-center" : "items-start text-left"
        )}
      >
        <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-secondary)]">
          {eyebrow}
        </span>
        <h2 className="text-3xl font-semibold">{title}</h2>
        {subtitle ? (
          <p className="max-w-2xl text-sm text-[color:var(--text-secondary)]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function renderImageBlock(block: Block) {
  const props = block.props as {
    src?: string;
    alt?: string;
    caption?: string;
    fit?: "cover" | "contain";
  };
  const src = props.src ?? "";
  const alt = props.alt ?? "";
  const fit = props.fit ?? "cover";
  const caption = props.caption ?? "";

  return (
    <figure className="rounded-3xl border border-white/10 bg-white/5 p-5">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "h-72 w-full rounded-2xl border border-white/10 object-center",
            fit === "contain" ? "object-contain" : "object-cover"
          )}
          loading="lazy"
        />
      ) : (
        <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 text-sm text-[color:var(--text-secondary)]">
          Image placeholder
        </div>
      )}
      {caption ? (
        <figcaption className="mt-3 text-xs text-[color:var(--text-secondary)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderSpacerBlock(block: Block) {
  const props = block.props as { height?: number; unit?: "px" | "vh" };
  const height = typeof props.height === "number" ? props.height : 48;
  const unit = props.unit ?? "px";
  return <div style={{ height: `${height}${unit}` }} />;
}

function renderHeadingBlock(block: Block) {
  const props = block.props as {
    text?: string;
    level?: number;
    align?: "left" | "center";
    eyebrow?: string;
  };
  const text = props.text ?? "Heading";
  const level = Math.min(Math.max(props.level ?? 2, 1), 4);
  const align = props.align ?? "left";
  const eyebrow = props.eyebrow ?? "";
  const Tag = (`h${level}` as keyof JSX.IntrinsicElements);

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          {eyebrow}
        </div>
      ) : null}
      <Tag className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">
        {text}
      </Tag>
    </div>
  );
}

function renderButtonBlock(block: Block) {
  const props = block.props as {
    label?: string;
    href?: string;
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    align?: "left" | "center";
  };
  const label = props.label ?? "Button";
  const href = props.href ?? "";
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const align = props.align ?? "left";

  const base = "inline-flex items-center justify-center rounded-full font-semibold transition";
  const variants: Record<string, string> = {
    primary: "bg-[color:var(--color-primary)] text-black",
    outline: "border border-white/20 text-[color:var(--text-primary)]",
    ghost: "text-[color:var(--text-primary)]",
  };
  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <a
        href={href || "#"}
        className={cn(base, variants[variant], sizes[size])}
      >
        {label}
      </a>
    </div>
  );
}

function renderLinkBlock(block: Block) {
  const props = block.props as { label?: string; href?: string; target?: "_self" | "_blank" };
  const label = props.label ?? "Link";
  const href = props.href ?? "#";
  const target = props.target ?? "_self";
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="text-sm font-medium text-[color:var(--color-primary)] underline"
    >
      {label}
    </a>
  );
}

function renderDividerBlock(block: Block) {
  const props = block.props as { style?: "solid" | "dashed"; spacing?: "sm" | "md" | "lg" };
  const style = props.style ?? "solid";
  const spacing = props.spacing ?? "md";
  return (
    <div className={cn(spacing === "sm" && "py-2", spacing === "md" && "py-4", spacing === "lg" && "py-6")}>
      <div
        className={cn(
          "w-full border-t",
          style === "solid" ? "border-white/15" : "border-dashed border-white/20"
        )}
      />
    </div>
  );
}

function renderCardBlock(block: Block) {
  const props = block.props as {
    eyebrow?: string;
    title?: string;
    body?: string;
    imageUrl?: string;
    ctaLabel?: string;
    ctaHref?: string;
    tone?: "default" | "muted";
  };
  const eyebrow = props.eyebrow ?? "Card";
  const title = props.title ?? "Card title";
  const body = props.body ?? "Add supporting copy for this card.";
  const imageUrl = props.imageUrl ?? "";
  const ctaLabel = props.ctaLabel ?? "Learn more";
  const ctaHref = props.ctaHref ?? "";
  const tone = props.tone ?? "default";

  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 p-5",
        tone === "muted" ? "bg-white/5" : "bg-white/10"
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="h-40 w-full rounded-2xl border border-white/10 object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-[color:var(--text-primary)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{body}</p>
        {ctaHref ? (
          <a
            href={ctaHref}
            className="mt-4 inline-flex text-sm font-semibold text-[color:var(--color-primary)]"
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function renderListBlock(block: Block) {
  const props = block.props as { title?: string; items?: string[] };
  const title = props.title ?? "List";
  const items = props.items ?? [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h4 className="text-sm font-semibold text-[color:var(--text-primary)]">{title}</h4>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[color:var(--text-secondary)]">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function renderQuoteBlock(block: Block) {
  const props = block.props as { quote?: string; author?: string; role?: string };
  const quote = props.quote ?? "A short testimonial or quote goes here.";
  const author = props.author ?? "John Doe";
  const role = props.role ?? "Founder";

  return (
    <figure className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <blockquote className="text-lg text-[color:var(--text-primary)]">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4 text-sm text-[color:var(--text-secondary)]">
        {author} · {role}
      </figcaption>
    </figure>
  );
}

function renderStatsBlock(block: Block) {
  const props = block.props as {
    title?: string;
    columns?: number;
    stats?: { label: string; value: string }[];
  };
  const title = props.title ?? "Key stats";
  const stats = props.stats ?? [];
  const columns = Math.min(Math.max(props.columns ?? 3, 1), 4);
  const gridClass = cn(
    columns === 1 && "md:grid-cols-1",
    columns === 2 && "md:grid-cols-2",
    columns === 3 && "md:grid-cols-3",
    columns === 4 && "md:grid-cols-4"
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h4 className="text-sm font-semibold text-[color:var(--text-primary)]">{title}</h4>
      <div className={cn("mt-4 grid gap-4", gridClass)}>
        {stats.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderFormBlock(block: Block) {
  const props = block.props as {
    title?: string;
    description?: string;
    submitLabel?: string;
    action?: string;
    method?: "post" | "get";
  };
  const title = props.title ?? "Contact form";
  const description = props.description ?? "Let visitors reach you fast.";
  const submitLabel = props.submitLabel ?? "Send message";
  const action = props.action;
  const method = props.method ?? "post";

  return (
    <form
      action={action}
      method={method}
      className="rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
          {description}
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm"
        />
        <textarea
          name="message"
          rows={4}
          placeholder="Message"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm"
        />
      </div>

      <div className="mt-5">
        <button
          type="submit"
          className="rounded-full bg-[color:var(--color-primary)] px-5 py-2 text-sm font-semibold text-black"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function renderHeroSectionBlock(block: Block) {
  const props = block.props as Partial<HeroModel> & {
    getInTouch?: string;
    resume?: string;
    resumeUrl?: string;
    badgeAvailable?: string;
    badgeRemote?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };

  const hero: HeroModel = {
    greeting: props.greeting ?? "Hello, I am",
    name: props.name ?? "Your Name",
    title: props.title ?? "Product Designer + Engineer",
    description:
      props.description ??
      "Crafting digital experiences with clarity, speed, and intent.",
    contact: props.contact ?? "",
    resume: props.resume ?? props.secondaryLabel ?? "View resume",
    resumeUrl: props.resumeUrl ?? props.secondaryHref ?? "#",
    location: props.location ?? "Remote",
    getInTouch: props.getInTouch ?? props.primaryLabel ?? "Contact",
    badge: {
      available: props.badgeAvailable ?? "Available",
      remote: props.badgeRemote ?? "Remote",
      status: "available",
    },
  };

  return <Hero hero={hero} />;
}

function renderAboutSectionBlock(block: Block) {
  const props = block.props as Partial<AboutModel> & {
    highlights?: string[];
  };
  const highlights = props.highlights ?? [];
  const fallbackApproach =
    highlights.length > 0
      ? {
          title: "Highlights",
          items: highlights.map((text) => ({
            icon: "check",
            title: text,
            description: "",
          })),
        }
      : undefined;

  const about: AboutModel = {
    subtitle: props.subtitle ?? "Summary",
    title: props.title ?? "Designing products with clarity.",
    description:
      props.description ??
      "Describe your background, mission, or what makes you different.",
    stats: props.stats,
    approach: props.approach ?? fallbackApproach,
  };

  return <About about={about} />;
}

function renderExperienceSectionBlock(block: Block) {
  const props = block.props as Partial<ExperienceModel>;
  const experience: ExperienceModel = {
    title: props.title ?? "Experience",
    subtitle: props.subtitle ?? "Selected roles",
    description:
      props.description ?? "Highlights from recent roles and responsibilities.",
    techStack: props.techStack ?? "Tech stack",
    items: (props.items ?? []).map((item, index) => ({
      id: item.id ?? `exp-${index + 1}`,
      role: item.role ?? "Role",
      company: item.company ?? "Company",
      companyUrl: item.companyUrl ?? "#",
      period: item.period ?? "",
      description: item.description ?? "",
      achievements: item.achievements ?? [],
      stack: item.stack ?? [],
      icon: item.icon,
    })),
  };

  return <Experience experience={experience} />;
}

function renderProjectsSectionBlock(block: Block) {
  const props = block.props as Partial<ProjectsModel>;
  const items = (props.items ?? []).map((item, index) => ({
    ...(item as ProjectsListItemModel),
    id: (item as ProjectsListItemModel).id ?? index + 1,
  }));

  const projects: ProjectsModel = {
    title: props.title ?? "Projects",
    subtitle: props.subtitle ?? "Case studies",
    description:
      props.description ?? "Selected work showcasing strategy, design, and delivery.",
    filters: props.filters ?? { all: "All", showMore: "Show more" },
    labels:
      props.labels ??
      {
        filteredBy: "Filtered by",
        clear: "Clear",
        viewCase: "View case",
        hideCase: "Hide case",
        problem: "Problem",
        solution: "Solution",
        result: "Result",
      },
    items,
  };

  return <Projects projects={projects} />;
}

function renderSkillsSectionBlock(block: Block) {
  const props = block.props as Partial<SkillsModel>;
  const skills: SkillsModel = {
    subtitle: props.subtitle ?? "Focus",
    title: props.title ?? "Skills",
    description: props.description ?? "Core competencies and tools in daily use.",
    focusAreas: props.focusAreas,
    categories: props.categories ?? [],
    usage: props.usage,
  };

  return <Skills skills={skills} />;
}

function renderResumeSectionBlock(block: Block) {
  const props = block.props as Partial<ResumeModel> & {
    downloadLabel?: string;
    fileUrl?: string;
    contactEmail?: string;
    contactLocation?: string;
  };
  const legacyResume =
    props.downloadLabel || props.fileUrl
      ? {
          title: "Product Designer & Engineer",
          meta: "PDF · Updated 2026",
          features: ["Full-stack projects", "Design systems", "Leadership"],
          downloadLabel: props.downloadLabel ?? "Download resume",
          fileUrl: props.fileUrl ?? "#",
        }
      : undefined;
  const legacyContact =
    props.contactEmail || props.contactLocation
      ? {
          title: "Contact",
          items: [
            { icon: "mail", label: "Email", value: props.contactEmail ?? "" },
            { icon: "location", label: "Location", value: props.contactLocation ?? "" },
          ],
        }
      : undefined;
  const resume: ResumeModel = {
    subtitle: props.subtitle ?? "Resume",
    title: props.title ?? "Download",
    description: props.description ?? "Grab the PDF or reach out directly.",
    resume: props.resume ?? legacyResume ?? {
      title: "Product Designer & Engineer",
      meta: "PDF · Updated 2026",
      features: ["Full-stack projects", "Design systems", "Leadership"],
      downloadLabel: "Download resume",
      fileUrl: "#",
    },
    contact: props.contact ?? legacyContact ?? {
      title: "Contact",
      items: [
        { icon: "mail", label: "Email", value: "hello@example.com" },
        { icon: "location", label: "Location", value: "Remote" },
      ],
    },
    socials: props.socials ?? {
      title: "Social",
      items: [
        { icon: "github", label: "GitHub", url: "#" },
        { icon: "linkedin", label: "LinkedIn", url: "#" },
      ],
    },
  };

  return <Resume resume={resume} />;
}

function renderFooterSectionBlock(block: Block) {
  const props = block.props as Partial<FooterModel> & {
    copyright?: string;
    links?: { label: string; href: string }[];
  };
  const footer: FooterModel = {
    tagline: props.tagline ?? "Let’s build something great together.",
    navigation: props.navigation ?? props.links ?? [],
    socials: props.socials ?? [],
    meta: props.meta ?? {
      copyright: props.copyright ?? "© 2026 Your Name",
      builtWith: "",
    },
  };

  return <Footer footer={footer} />;
}

function renderHeroMediaBlock(block: Block) {
  return <HeroMediaBlock block={block} />;
}

function renderHeroLocationBlock(block: Block) {
  return <HeroLocationBlock block={block} />;
}

function renderHeroTitleBlock(block: Block) {
  return <HeroTitleBlock block={block} />;
}

function renderHeroSubtitleBlock(block: Block) {
  return <HeroSubtitleBlock block={block} />;
}

function renderHeroDescriptionBlock(block: Block) {
  return <HeroDescriptionBlock block={block} />;
}

function renderHeroCtaBlock(block: Block) {
  return <HeroCtaBlock block={block} />;
}

function renderHeroSocialsBlock(block: Block) {
  return <HeroSocialsBlock block={block} />;
}

function renderBlock(block: Block) {
  switch (block.type) {
    case "text":
      return renderTextBlock(block);
    case "section":
      return renderSectionBlock(block);
    case "image":
      return renderImageBlock(block);
    case "spacer":
      return renderSpacerBlock(block);
    case "heading":
      return renderHeadingBlock(block);
    case "button":
      return renderButtonBlock(block);
    case "link":
      return renderLinkBlock(block);
    case "divider":
      return renderDividerBlock(block);
    case "card":
      return renderCardBlock(block);
    case "list":
      return renderListBlock(block);
    case "quote":
      return renderQuoteBlock(block);
    case "stats":
      return renderStatsBlock(block);
    case "form":
      return renderFormBlock(block);
    case "hero":
      return renderHeroSectionBlock(block);
    case "about":
      return renderAboutSectionBlock(block);
    case "experience":
      return renderExperienceSectionBlock(block);
    case "projects":
      return renderProjectsSectionBlock(block);
    case "skills":
      return renderSkillsSectionBlock(block);
    case "resume":
      return renderResumeSectionBlock(block);
    case "footer":
      return renderFooterSectionBlock(block);
    case "hero-media":
      return renderHeroMediaBlock(block);
    case "hero-location":
      return renderHeroLocationBlock(block);
    case "hero-title":
      return renderHeroTitleBlock(block);
    case "hero-subtitle":
      return renderHeroSubtitleBlock(block);
    case "hero-description":
      return renderHeroDescriptionBlock(block);
    case "hero-cta":
      return renderHeroCtaBlock(block);
    case "hero-socials":
      return renderHeroSocialsBlock(block);
    case "buttons":
      return <ButtonsBlock block={block} />;
    case "socials":
      return <SocialsBlock block={block} />;
    default:
      return (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-[color:var(--text-secondary)]">
          Unsupported block: {block.type}
        </div>
      );
  }
}

function renderNode(
  nodeId: string,
  nodes: Record<string, LayoutNode>,
  blocks: Record<string, Block>
): ReactNode {
  const node = nodes[nodeId];
  if (!node) return null;

  if (node.type === "block") {
    const block = blocks[node.blockId];
    if (!block) return null;
    return <div key={node.id}>{renderBlock(block)}</div>;
  }

  const childNodes = node.children
    .map((childId) => nodes[childId])
    .filter(Boolean) as LayoutNode[];
  const children = childNodes
    .map((child) => renderNode(child.id, nodes, blocks))
    .filter(Boolean);

  if (node.type === "column") {
    return (
      <div key={node.id} className="flex flex-col gap-6">
        {children}
      </div>
    );
  }

  const allColumns =
    childNodes.length > 0 && childNodes.every((child) => child.type === "column");
  const sectionMeta = (node.meta ?? {}) as {
    variant?: string;
    sectionId?: string;
    containerClassName?: string;
    glow?: boolean;
  };

  const columnCount = childNodes.length;
  const gridClass = cn(
    columnCount === 1 && "md:grid-cols-1",
    columnCount === 2 && "md:grid-cols-2",
    columnCount === 3 && "md:grid-cols-3",
    columnCount === 4 && "md:grid-cols-4"
  );

  const renderedChildren =
    allColumns && !sectionMeta.containerClassName ? (
      <div className={cn("grid gap-6", gridClass)}>{children}</div>
    ) : (
      children
    );

  if (sectionMeta.variant || sectionMeta.containerClassName || sectionMeta.sectionId) {
    return (
      <Section
        key={node.id}
        id={sectionMeta.sectionId}
        variant={(sectionMeta.variant ?? "default") as "default" | "hero"}
        containerClassName={sectionMeta.containerClassName}
        glow={sectionMeta.glow ?? false}
      >
        {renderedChildren}
      </Section>
    );
  }

  return (
    <section key={node.id} className="space-y-6">
      {renderedChildren}
    </section>
  );
}

export function PageContentRenderer({ content }: { content: PageContent }) {
  const rootId = content.layoutTree.rootId;
  if (!rootId) return null;
  return (
    <div className="space-y-6">
      {renderNode(rootId, content.layoutTree.nodes, content.blocks.byId)}
    </div>
  );
}
