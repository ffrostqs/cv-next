"use client";

import { Suspense, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCenter,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import type { Block, BlockDefinition } from "@/lib/blocks";
import { getBlockComponent, getBlockDefinition, listBlockDefinitions } from "@/lib/blocks";
import { useEditorAutosave, type PageContent } from "@/lib/editor";
import {
  createBlockNode,
  createSectionNode,
  createColumnNode,
  removeNode,
  moveNode,
  type BlockNode,
  type LayoutNode,
  type LayoutTree,
} from "@/lib/editor/layout-tree";
import { useEditorStore } from "@/lib/editor/store";
import { BlockInserter, BLOCK_INSERTER_KIND } from "@/components/editor/BlockInserter";
import { Inspector } from "@/components/editor/Inspector";
import { BlockWrapper } from "@/components/editor/canvas/BlockWrapper";
import { DropIndicator, type DropIndicatorPosition } from "@/components/editor/canvas/DropIndicator";
import { DragOverlay } from "@/components/editor/canvas/DragOverlay";
import { cn } from "@/components/ui/utils";
import { shallow } from "zustand/shallow";

const ROOT_ID = "root";
const CONTAINER_PREFIX = "container:";

type BlockNodeRef = {
  nodeId: string;
  blockId: string;
  containerId: string;
  sectionId: string;
};

type TemplateBlockConfig = {
  type: string;
  props?: Record<string, unknown>;
};

type TemplateColumnConfig = {
  blocks: TemplateBlockConfig[];
};

type TemplateSectionConfig = {
  columns?: TemplateColumnConfig[];
  blocks?: TemplateBlockConfig[];
  meta?: Record<string, unknown>;
};

type TemplateBuildResult = {
  sectionId: string;
  primaryContainerId: string;
  nodes: Record<string, LayoutNode>;
  blocks: Record<string, Block>;
};

type DragDataRecord = Record<string, unknown>;

function isRecord(value: unknown): value is DragDataRecord {
  return typeof value === "object" && value !== null;
}

function getOverIndex(overData: unknown): number | null {
  if (!isRecord(overData)) return null;
  const sortable = overData.sortable;
  if (!isRecord(sortable)) return null;
  const index = sortable.index;
  return typeof index === "number" ? index : null;
}

function getInserterType(activeData: unknown): string | null {
  if (!isRecord(activeData)) return null;
  if (activeData.kind !== BLOCK_INSERTER_KIND) return null;
  const blockType = activeData.blockType;
  return typeof blockType === "string" ? blockType : null;
}

function getDropPosition(
  blockIds: string[],
  activeId: string | null,
  overId: string | null
): DropIndicatorPosition | null {
  if (!activeId || !overId) return null;
  const activeIndex = blockIds.indexOf(activeId);
  const overIndex = blockIds.indexOf(overId);
  if (overIndex === -1) return null;
  if (activeIndex === -1) return "above";
  return activeIndex < overIndex ? "below" : "above";
}

function cloneDefaults<T>(value: T | undefined): T | undefined {
  if (value === undefined) return value;
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

function resolveBlockProps(
  type: string,
  overrides?: Record<string, unknown>
) {
  const defaults = cloneDefaults(getBlockDefinition(type)?.defaults) ?? {};
  if (!overrides) return defaults;
  return { ...defaults, ...cloneDefaults(overrides) };
}

function createTextContent(text: string) {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text }],
      },
    ],
  };
}

function createId(prefix: string) {
  const base =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${base}`;
}

function toContainerId(id: string) {
  return `${CONTAINER_PREFIX}${id}`;
}

function fromContainerId(id: string) {
  return id.startsWith(CONTAINER_PREFIX) ? id.slice(CONTAINER_PREFIX.length) : null;
}

function buildTemplateSection(
  rootId: string,
  config: TemplateSectionConfig
): TemplateBuildResult {
  const nodes: Record<string, LayoutNode> = {};
  const blocks: Record<string, Block> = {};
  const sectionId = createId("section");
  const sectionChildren: string[] = [];
  let primaryContainerId = sectionId;

  const addBlock = (parentId: string, blockConfig: TemplateBlockConfig, children: string[]) => {
    const blockId = createId("block");
    const nodeId = createId("node");
    blocks[blockId] = {
      id: blockId,
      type: blockConfig.type,
      enabled: true,
      props: resolveBlockProps(blockConfig.type, blockConfig.props),
    };
    nodes[nodeId] = createBlockNode(nodeId, parentId, blockId);
    children.push(nodeId);
  };

  if (config.columns && config.columns.length > 0) {
    config.columns.forEach((column, index) => {
      const columnId = createId("column");
      if (index === 0) {
        primaryContainerId = columnId;
      }
      const columnChildren: string[] = [];
      column.blocks.forEach((blockConfig) =>
        addBlock(columnId, blockConfig, columnChildren)
      );
      nodes[columnId] = createColumnNode(columnId, sectionId, {
        children: columnChildren,
      });
      sectionChildren.push(columnId);
    });
  } else if (config.blocks && config.blocks.length > 0) {
    config.blocks.forEach((blockConfig) =>
      addBlock(sectionId, blockConfig, sectionChildren)
    );
  }

  nodes[sectionId] = createSectionNode(sectionId, {
    parentId: rootId,
    children: sectionChildren,
    meta: config.meta,
  });

  return { sectionId, primaryContainerId, nodes, blocks };
}

function createHeroTemplate(): TemplateSectionConfig {
  return {
    meta: {
      variant: "hero",
      sectionId: "hero",
      containerClassName:
        "grid grid-cols-1 items-center gap-16 lg:my-4 lg:grid-cols-2",
    },
    columns: [
      {
        blocks: [
          {
            type: "hero-media",
          },
        ],
      },
      {
        blocks: [
          {
            type: "hero-location",
          },
          {
            type: "hero-title",
          },
          {
            type: "hero-subtitle",
          },
          {
            type: "hero-description",
          },
          {
            type: "hero-cta",
          },
          {
            type: "hero-socials",
          },
        ],
      },
    ],
  };
}

function createAboutTemplate(): TemplateSectionConfig {
  return {
    columns: [
      {
        blocks: [
          {
            type: "heading",
            props: {
              eyebrow: "About",
              text: "Designing products with clarity.",
              level: 2,
              align: "left",
            },
          },
          {
            type: "text",
            props: {
              content: createTextContent(
                "Share your story, what you value, and the problems you love solving."
              ),
            },
          },
          {
            type: "button",
            props: {
              label: "Let's talk",
              href: "#contact",
              variant: "primary",
              size: "md",
              align: "left",
            },
          },
        ],
      },
      {
        blocks: [
          {
            type: "stats",
            props: {
              title: "Highlights",
              columns: 1,
              stats: [
                { label: "Years", value: "8+" },
                { label: "Projects", value: "24" },
                { label: "Industries", value: "5" },
              ],
            },
          },
        ],
      },
    ],
  };
}

function createExperienceTemplate(): TemplateSectionConfig {
  return {
    blocks: [
      {
        type: "heading",
        props: {
          eyebrow: "Experience",
          text: "Selected roles",
          level: 2,
          align: "left",
        },
      },
      {
        type: "text",
        props: {
          content: createTextContent(
            "Summaries of recent roles, impact, and responsibilities."
          ),
        },
      },
      {
        type: "card",
        props: {
          eyebrow: "2024 — Present",
          title: "Senior Product Designer",
          body: "Leading product strategy, design systems, and delivery for B2B platforms.",
          ctaLabel: "View details",
          ctaHref: "#experience",
        },
      },
      {
        type: "card",
        props: {
          eyebrow: "2021 — 2024",
          title: "Product Designer",
          body: "Shipped cross-platform experiences for fintech and enterprise teams.",
          ctaLabel: "View details",
          ctaHref: "#experience",
        },
      },
    ],
  };
}

function createProjectsTemplate(): TemplateSectionConfig {
  return {
    blocks: [
      {
        type: "heading",
        props: {
          eyebrow: "Projects",
          text: "Case studies",
          level: 2,
          align: "left",
        },
      },
      {
        type: "text",
        props: {
          content: createTextContent(
            "A curated set of product, design, and engineering work."
          ),
        },
      },
      {
        type: "card",
        props: {
          eyebrow: "Fintech",
          title: "Analytics Dashboard",
          body: "Real-time insights for executive reporting and growth.",
          ctaLabel: "View case",
          ctaHref: "#projects",
        },
      },
      {
        type: "card",
        props: {
          eyebrow: "E-commerce",
          title: "Marketplace Redesign",
          body: "Improved onboarding and conversion across the funnel.",
          ctaLabel: "View case",
          ctaHref: "#projects",
        },
      },
    ],
  };
}

function createSkillsTemplate(): TemplateSectionConfig {
  return {
    columns: [
      {
        blocks: [
          {
            type: "heading",
            props: {
              eyebrow: "Skills",
              text: "Core competencies",
              level: 2,
              align: "left",
            },
          },
          {
            type: "text",
            props: {
              content: createTextContent(
                "From product strategy to full-stack delivery."
              ),
            },
          },
        ],
      },
      {
        blocks: [
          {
            type: "list",
            props: {
              title: "Focus areas",
              items: [
                "Product strategy",
                "Design systems",
                "Front-end engineering",
                "Research & discovery",
              ],
            },
          },
        ],
      },
    ],
  };
}

function createResumeTemplate(): TemplateSectionConfig {
  return {
    columns: [
      {
        blocks: [
          {
            type: "heading",
            props: {
              eyebrow: "Resume",
              text: "Download the PDF",
              level: 2,
              align: "left",
            },
          },
          {
            type: "text",
            props: {
              content: createTextContent(
                "Quick overview of roles, achievements, and technical stack."
              ),
            },
          },
          {
            type: "button",
            props: {
              label: "Download resume",
              href: "#resume",
              variant: "primary",
              size: "md",
              align: "left",
            },
          },
        ],
      },
      {
        blocks: [
          {
            type: "list",
            props: {
              title: "Highlights",
              items: [
                "Full-stack delivery",
                "Design systems leadership",
                "Cross-functional collaboration",
              ],
            },
          },
        ],
      },
    ],
  };
}

function createFooterTemplate(): TemplateSectionConfig {
  return {
    blocks: [
      {
        type: "divider",
        props: {
          style: "solid",
          spacing: "lg",
        },
      },
      {
        type: "list",
        props: {
          title: "Quick links",
          items: ["About", "Experience", "Projects", "Contact"],
        },
      },
      {
        type: "text",
        props: {
          content: createTextContent("© 2026 Your Name. Built with Next.js."),
        },
      },
    ],
  };
}

type LegacyHeroProps = {
  greeting?: string;
  name?: string;
  title?: string;
  description?: string;
  getInTouch?: string;
  resume?: string;
  resumeUrl?: string;
  location?: string;
  badgeAvailable?: string;
  badgeRemote?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  availability?: string;
};

function createHeroTemplateFromBlock(block: Block): TemplateSectionConfig {
  const props = block.props as LegacyHeroProps;
  const greeting = props.greeting ?? "Hello, I am";
  const name = props.name ?? "Your Name";
  const title = props.title ?? "Product Designer + Engineer";
  const description =
    props.description ??
    "Crafting digital experiences with clarity, speed, and intent.";
  const location = props.location ?? "Remote";
  const badgeAvailable = props.badgeAvailable ?? props.availability ?? "Available";
  const badgeRemote = props.badgeRemote ?? "Remote";
  const primaryLabel = props.getInTouch ?? props.primaryLabel ?? "Contact";
  const secondaryLabel = props.resume ?? props.secondaryLabel ?? "View resume";
  const secondaryHref = props.resumeUrl ?? props.secondaryHref ?? "#resume";

  return {
    meta: {
      variant: "hero",
      sectionId: "hero",
      containerClassName:
        "grid grid-cols-1 items-center gap-16 lg:my-4 lg:grid-cols-2",
    },
    columns: [
      {
        blocks: [
          {
            type: "hero-media",
            props: {
              badgeAvailable,
              badgeRemote,
            },
          },
        ],
      },
      {
        blocks: [
          {
            type: "hero-location",
            props: { location },
          },
          {
            type: "hero-title",
            props: { greeting, name },
          },
          {
            type: "hero-subtitle",
            props: { text: title },
          },
          {
            type: "hero-description",
            props: { text: description },
          },
          {
            type: "hero-cta",
            props: {
              primaryLabel,
              secondaryLabel,
              secondaryHref,
            },
          },
          {
            type: "hero-socials",
          },
        ],
      },
    ],
  };
}

function migrateLegacyHero(content: PageContent) {
  const rootId = content.layoutTree.rootId ?? ROOT_ID;
  const rootNode = content.layoutTree.nodes[rootId] ?? createSectionNode(rootId);
  const nodes: Record<string, LayoutNode> = {
    ...content.layoutTree.nodes,
    [rootId]: rootNode,
  };
  const blocks = { ...content.blocks.byId };

  const hasSectionChild = rootNode.children.some(
    (childId) => nodes[childId]?.type === "section"
  );
  if (hasSectionChild) {
    return { content, migrated: false };
  }

  let migrated = false;
  const newRootChildren: string[] = [];
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (!buffer.length) return;
    const sectionId = createId("section");
    nodes[sectionId] = createSectionNode(sectionId, {
      parentId: rootId,
      children: buffer,
    });
    for (const childId of buffer) {
      const child = nodes[childId];
      if (child) nodes[childId] = { ...child, parentId: sectionId };
    }
    newRootChildren.push(sectionId);
    buffer = [];
  };

  for (const childId of rootNode.children) {
    const node = nodes[childId];
    if (!node || node.type !== "block") {
      buffer.push(childId);
      continue;
    }

    const block = blocks[node.blockId];
    if (!block || block.type !== "hero") {
      buffer.push(childId);
      continue;
    }

    flushBuffer();

    const template = buildTemplateSection(rootId, createHeroTemplateFromBlock(block));
    for (const [id, createdNode] of Object.entries(template.nodes)) {
      nodes[id] = createdNode;
    }
    for (const [id, createdBlock] of Object.entries(template.blocks)) {
      blocks[id] = createdBlock;
    }

    newRootChildren.push(template.sectionId);
    delete nodes[childId];
    delete blocks[node.blockId];
    migrated = true;
  }

  flushBuffer();

  if (!migrated) {
    return { content, migrated: false };
  }

  const nextTree = {
    rootId,
    nodes: {
      ...nodes,
      [rootId]: { ...rootNode, children: newRootChildren },
    },
  };

  return {
    content: {
      version: "1",
      layoutTree: nextTree,
      blocks: { byId: blocks },
    },
    migrated: true,
  };
}

function getSectionIds(layoutTree: LayoutTree): string[] {
  const rootId = layoutTree.rootId ?? ROOT_ID;
  const root = layoutTree.nodes[rootId];
  if (!root) return [];
  const sectionChildren = root.children
    .map((childId) => layoutTree.nodes[childId])
    .filter((node): node is LayoutNode => Boolean(node))
    .filter((node) => node.type === "section")
    .map((node) => node.id);

  if (sectionChildren.length > 0) return sectionChildren;
  return [rootId];
}

function getContainers(layoutTree: LayoutTree) {
  const rootId = layoutTree.rootId ?? ROOT_ID;
  const root = layoutTree.nodes[rootId];
  if (!root) {
    return {
      sectionIds: [] as string[],
      containers: [] as { id: string; sectionId: string }[],
      blockRefs: [] as BlockNodeRef[],
    };
  }

  const sectionIds = getSectionIds(layoutTree);
  const containers: { id: string; sectionId: string }[] = [];
  const blockRefs: BlockNodeRef[] = [];

  for (const sectionId of sectionIds) {
    const section = layoutTree.nodes[sectionId];
    if (!section) continue;
    const childNodes = section.children
      .map((childId) => layoutTree.nodes[childId])
      .filter((node): node is LayoutNode => Boolean(node));
    const columnNodes = childNodes.filter((node) => node.type === "column");

    if (columnNodes.length > 0) {
      for (const column of columnNodes) {
        containers.push({ id: column.id, sectionId });
        const columnChildren = column.children
          .map((childId) => layoutTree.nodes[childId])
          .filter((node): node is LayoutNode => Boolean(node))
          .filter((node) => node.type === "block") as BlockNode[];
        for (const node of columnChildren) {
          blockRefs.push({
            nodeId: node.id,
            blockId: node.blockId,
            containerId: column.id,
            sectionId,
          });
        }
      }
    } else {
      containers.push({ id: sectionId, sectionId });
      const blockChildren = childNodes.filter((node) => node.type === "block") as BlockNode[];
      for (const node of blockChildren) {
        blockRefs.push({
          nodeId: node.id,
          blockId: node.blockId,
          containerId: sectionId,
          sectionId,
        });
      }
    }
  }

  return { sectionIds, containers, blockRefs };
}

function SortableBlockRow({
  nodeId,
  blockId,
  containerId,
  dropPosition,
  showDropIndicator,
  onRemove,
  onActivateContainer,
}: {
  nodeId: string;
  blockId: string;
  containerId: string;
  dropPosition: DropIndicatorPosition | null;
  showDropIndicator: boolean;
  onRemove?: (blockId: string) => void;
  onActivateContainer?: (containerId: string) => void;
}) {
  const block = useEditorStore((state) => state.blocks.byId[blockId]);
  const selected = useEditorStore(
    (state) => state.selection.blockId === blockId
  );
  const setSelection = useEditorStore((state) => state.setSelection);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: blockId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as const;

  const inlineEditableTypes = new Set([
    "text",
    "hero-location",
    "hero-title",
    "hero-subtitle",
    "hero-description",
    "hero-cta",
  ]);
  const allowInteractions = block ? inlineEditableTypes.has(block.type) : false;
  const wrapperClassName = cn(
    "cursor-default",
    block?.type?.startsWith("hero-") ? "px-0 py-0" : ""
  );

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {showDropIndicator && dropPosition ? (
        <DropIndicator position={dropPosition} />
      ) : null}
      <BlockWrapper
        id={blockId}
        selected={selected}
        dragging={isDragging}
        onSelect={() => {
          setSelection({ blockId, nodeId });
          onActivateContainer?.(containerId);
        }}
        disableInteractions={!allowInteractions}
        className={wrapperClassName}
      >
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          onClick={(event) => event.stopPropagation()}
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] opacity-0 transition group-hover:opacity-100 cursor-grab active:cursor-grabbing"
          aria-label="Drag block"
        >
          Drag
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.(blockId);
          }}
          className="absolute right-3 top-12 rounded-full border border-red-400/30 bg-red-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-red-200 opacity-0 transition group-hover:opacity-100"
          aria-label="Delete block"
        >
          Delete
        </button>
        {block ? (
          renderBlock(block)
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-[color:var(--text-secondary)]">
            Missing block: {blockId}
          </div>
        )}
      </BlockWrapper>
    </div>
  );
}

const MemoSortableBlockRow = memo(SortableBlockRow);

function ContainerCanvas({
  containerId,
  blockIds,
  blockRefById,
  activeId,
  overId,
  dropPosition,
  onRemove,
  onActivateContainer,
  isActive,
}: {
  containerId: string;
  blockIds: string[];
  blockRefById: Map<string, BlockNodeRef>;
  activeId: string | null;
  overId: string | null;
  dropPosition: DropIndicatorPosition | null;
  onRemove: (blockId: string) => void;
  onActivateContainer: () => void;
  isActive: boolean;
}) {
  const { setNodeRef } = useDroppable({ id: toContainerId(containerId) });

  return (
    <SortableContext items={blockIds}>
      <div
        ref={setNodeRef}
        onClick={onActivateContainer}
        className={cn(
          "min-h-[120px] rounded-2xl border border-dashed border-white/10 bg-white/5 p-3",
          isActive ? "border-cyan-200/50" : ""
        )}
      >
        {blockIds.length === 0 ? (
          <div className="text-xs text-[color:var(--text-secondary)]">
            Drop blocks here.
          </div>
        ) : null}
        {blockIds.map((blockId) => {
          const ref = blockRefById.get(blockId);
          if (!ref) return null;
          const showDropIndicator = overId === blockId && activeId !== blockId;
          return (
            <MemoSortableBlockRow
              key={blockId}
              nodeId={ref.nodeId}
              blockId={blockId}
              containerId={containerId}
              dropPosition={showDropIndicator ? dropPosition : null}
              showDropIndicator={showDropIndicator}
              onRemove={onRemove}
              onActivateContainer={onActivateContainer}
            />
          );
        })}
      </div>
    </SortableContext>
  );
}

export function PageBuilder({
  pageId,
  initialContent,
}: {
  pageId: string;
  initialContent: PageContent;
}) {
  const [ready, setReady] = useState(false);
  const layoutTree = useEditorStore((state) => state.layoutTree);
  const { autosave, dirty } = useEditorStore(
    (state) => ({ autosave: state.autosave, dirty: state.dirty }),
    shallow
  );
  const { leftSidebarOpen, rightSidebarOpen } = useEditorStore(
    (state) => state.ui,
    shallow
  );
  const setUi = useEditorStore((state) => state.setUi);
  const initializedRef = useRef<string | null>(null);
  const [activeContainerId, setActiveContainerId] = useState<string | null>(null);

  useEffect(() => {
    if (initializedRef.current === pageId) return;
    const migration = migrateLegacyHero(initialContent);
    useEditorStore.setState({
      layoutTree: migration.content.layoutTree,
      blocks: migration.content.blocks,
      selection: { nodeId: null, blockId: null },
      history: { past: [], future: [], maxSize: 100 },
      autosave: { status: "idle", error: null, lastSavedAt: null, intervalMs: 20000 },
      dirty: migration.migrated,
      revision: 0,
    });
    initializedRef.current = pageId;
    setReady(true);
  }, [pageId, initialContent]);

  useEditorAutosave({
    save: async (payload) => {
      const response = await fetch(`/api/admin/pages/${pageId}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: {
            version: "1",
            layoutTree: payload.layoutTree,
            blocks: payload.blocks,
          },
          label: "autosave",
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message =
          typeof data?.error === "string" ? data.error : "Failed to save";
        throw new Error(message);
      }
    },
    enabled: ready,
  });

  const { sectionIds, containers, blockRefs } = useMemo(
    () => getContainers(layoutTree),
    [layoutTree]
  );
  const blockIdToNodeId = useMemo(() => {
    const map = new Map<string, string>();
    for (const ref of blockRefs) {
      map.set(ref.blockId, ref.nodeId);
    }
    return map;
  }, [blockRefs]);
  const blockIdToContainerId = useMemo(() => {
    const map = new Map<string, string>();
    for (const ref of blockRefs) {
      map.set(ref.blockId, ref.containerId);
    }
    return map;
  }, [blockRefs]);
  const blocksByContainer = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const container of containers) {
      map.set(container.id, []);
    }
    for (const ref of blockRefs) {
      const list = map.get(ref.containerId) ?? [];
      list.push(ref.blockId);
      map.set(ref.containerId, list);
    }
    return map;
  }, [containers, blockRefs]);
  const blockRefById = useMemo(() => {
    const map = new Map<string, BlockNodeRef>();
    for (const ref of blockRefs) {
      map.set(ref.blockId, ref);
    }
    return map;
  }, [blockRefs]);
  const columnsBySection = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const sectionId of sectionIds) {
      map.set(sectionId, []);
    }
    for (const container of containers) {
      if (container.id !== container.sectionId) {
        const list = map.get(container.sectionId) ?? [];
        list.push(container.id);
        map.set(container.sectionId, list);
      }
    }
    return map;
  }, [containers, sectionIds]);

  useEffect(() => {
    if (!activeContainerId && containers.length > 0) {
      setActiveContainerId(containers[0].id);
    }
  }, [activeContainerId, containers]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const activeBlock = useEditorStore((state) =>
    activeId ? state.blocks.byId[activeId] ?? null : null
  );
  const builderDefinitions = useMemo(() => {
    const hiddenTypes = new Set([
      "hero",
      "about",
      "experience",
      "projects",
      "skills",
      "resume",
      "footer",
    ]);
    return listBlockDefinitions().filter((definition) => {
      if (definition.type.startsWith("template:")) return true;
      if (hiddenTypes.has(definition.type)) return false;
      return true;
    });
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverId(event.over ? String(event.over.id) : null);
  }, []);

  const prepareRootForSectionInsert = useCallback(() => {
    const state = useEditorStore.getState();
    const rootId = state.layoutTree.rootId ?? ROOT_ID;
    const rootNode = state.layoutTree.nodes[rootId] ?? createSectionNode(rootId);
    const nextNodes = { ...state.layoutTree.nodes, [rootId]: rootNode };
    let nextRootChildren = [...rootNode.children];

    const hasSectionChildren = rootNode.children.some((childId) => {
      const node = state.layoutTree.nodes[childId];
      return node?.type === "section";
    });

    if (!hasSectionChildren && rootNode.children.length > 0) {
      const legacySectionId = createId("section");
      nextNodes[legacySectionId] = createSectionNode(legacySectionId, {
        parentId: rootId,
        children: [...rootNode.children],
      });
      nextRootChildren = [legacySectionId];

      for (const childId of rootNode.children) {
        const node = nextNodes[childId];
        if (node) {
          nextNodes[childId] = { ...node, parentId: legacySectionId };
        }
      }
    }

    return { state, rootId, rootNode, nextNodes, nextRootChildren };
  }, []);

  const insertTemplateSection = useCallback(
    (config: TemplateSectionConfig, label: string) => {
      const { state, rootId, rootNode, nextNodes, nextRootChildren } =
        prepareRootForSectionInsert();

      const template = buildTemplateSection(rootId, config);

      state.commit(
        {
          layoutTree: {
            rootId,
            nodes: {
              ...nextNodes,
              ...template.nodes,
              [rootId]: {
                ...rootNode,
                children: [...nextRootChildren, template.sectionId],
              },
            },
          },
          blocks: {
            byId: {
              ...state.blocks.byId,
              ...template.blocks,
            },
          },
        },
        { label }
      );

      setActiveContainerId(template.primaryContainerId);
    },
    [prepareRootForSectionInsert]
  );

  const insertSection = useCallback(() => {
    const { state, rootId, rootNode, nextNodes, nextRootChildren } =
      prepareRootForSectionInsert();

    const sectionId = createId("section");
    nextNodes[sectionId] = createSectionNode(sectionId, {
      parentId: rootId,
      children: [],
    });
    nextRootChildren.push(sectionId);

    state.commit(
      {
        layoutTree: {
          rootId,
          nodes: {
            ...nextNodes,
            [rootId]: { ...rootNode, children: nextRootChildren },
          },
        },
      },
      { label: "insert-section" }
    );

    setActiveContainerId(sectionId);
  }, [prepareRootForSectionInsert]);

  const insertHeroTemplate = useCallback(() => {
    insertTemplateSection(createHeroTemplate(), "insert-hero-template");
  }, [insertTemplateSection]);

  const insertAboutTemplate = useCallback(() => {
    insertTemplateSection(createAboutTemplate(), "insert-about-template");
  }, [insertTemplateSection]);

  const insertExperienceTemplate = useCallback(() => {
    insertTemplateSection(createExperienceTemplate(), "insert-experience-template");
  }, [insertTemplateSection]);

  const insertProjectsTemplate = useCallback(() => {
    insertTemplateSection(createProjectsTemplate(), "insert-projects-template");
  }, [insertTemplateSection]);

  const insertSkillsTemplate = useCallback(() => {
    insertTemplateSection(createSkillsTemplate(), "insert-skills-template");
  }, [insertTemplateSection]);

  const insertResumeTemplate = useCallback(() => {
    insertTemplateSection(createResumeTemplate(), "insert-resume-template");
  }, [insertTemplateSection]);

  const insertFooterTemplate = useCallback(() => {
    insertTemplateSection(createFooterTemplate(), "insert-footer-template");
  }, [insertTemplateSection]);

  const addColumn = useCallback((sectionId: string) => {
    const state = useEditorStore.getState();
    const section = state.layoutTree.nodes[sectionId];
    if (!section || section.type !== "section") return;

    const childNodes = section.children
      .map((childId) => state.layoutTree.nodes[childId])
      .filter((node): node is LayoutNode => Boolean(node));
    const columnNodes = childNodes.filter((node) => node.type === "column");
    const blockNodes = childNodes.filter((node) => node.type === "block") as BlockNode[];

    const nextNodes = { ...state.layoutTree.nodes };
    let nextChildren = [...section.children];

    const createColumn = (id: string, children: string[]) =>
      createColumnNode(id, sectionId, { children });

    if (columnNodes.length === 0) {
      const firstColumnId = createId("column");
      const secondColumnId = createId("column");

      nextNodes[firstColumnId] = createColumn(firstColumnId, blockNodes.map((node) => node.id));
      nextNodes[secondColumnId] = createColumn(secondColumnId, []);

      for (const node of blockNodes) {
        nextNodes[node.id] = { ...node, parentId: firstColumnId };
      }

      nextChildren = [firstColumnId, secondColumnId];
    } else {
      if (columnNodes.length >= 4) return;
      const columnId = createId("column");
      nextNodes[columnId] = createColumn(columnId, []);
      nextChildren = [...section.children, columnId];
    }

    state.commit(
      {
        layoutTree: {
          ...state.layoutTree,
          nodes: {
            ...nextNodes,
            [sectionId]: { ...section, children: nextChildren },
          },
        },
      },
      { label: "add-column" }
    );
  }, []);

  const insertBlock = useCallback(
    (type: string, index?: number, containerId?: string) => {
      if (type.startsWith("template:")) {
        if (type === "template:section") insertSection();
        if (type === "template:hero") insertHeroTemplate();
        if (type === "template:about") insertAboutTemplate();
        if (type === "template:experience") insertExperienceTemplate();
        if (type === "template:projects") insertProjectsTemplate();
        if (type === "template:skills") insertSkillsTemplate();
        if (type === "template:resume") insertResumeTemplate();
        if (type === "template:footer") insertFooterTemplate();
        return;
      }

      const blockId = createId("block");
      const nodeId = createId("node");
      const nextBlock: Block = {
        id: blockId,
        type,
        enabled: true,
        props: resolveBlockProps(type),
      };

      const state = useEditorStore.getState();
      const rootId = state.layoutTree.rootId ?? ROOT_ID;
      const rootNode: LayoutNode =
        state.layoutTree.nodes[rootId] ?? createSectionNode(rootId);

      const resolvedContainerId =
        containerId ?? activeContainerId ?? containers[0]?.id ?? rootId;
      const parentNode = state.layoutTree.nodes[resolvedContainerId] ?? rootNode;

      const nextChildren = [...parentNode.children];
      const insertAt =
        index === undefined || index < 0 || index > nextChildren.length
          ? nextChildren.length
          : index;
      nextChildren.splice(insertAt, 0, nodeId);

      const blockNode = createBlockNode(nodeId, parentNode.id, blockId);
      const nextTree = {
        rootId,
        nodes: {
          ...state.layoutTree.nodes,
          [parentNode.id]: { ...parentNode, children: nextChildren },
          [nodeId]: blockNode,
        },
      };

      state.commit(
        {
          layoutTree: nextTree,
          blocks: {
            byId: {
              ...state.blocks.byId,
              [blockId]: nextBlock,
            },
          },
          selection: { nodeId, blockId },
        },
        { label: "insert-block", batchKey: "insert-blocks", batchWindowMs: 800 }
      );
    },
    [
      activeContainerId,
      containers,
      insertSection,
      insertHeroTemplate,
      insertAboutTemplate,
      insertExperienceTemplate,
      insertProjectsTemplate,
      insertSkillsTemplate,
      insertResumeTemplate,
      insertFooterTemplate,
    ]
  );

  const reorderBlocks = useCallback(
    (order: string[], containerId: string) => {
      const state = useEditorStore.getState();
      const parentNode = state.layoutTree.nodes[containerId];
      if (!parentNode) return;

      const nodeIds = order
        .map((blockId) => blockIdToNodeId.get(blockId))
        .filter(Boolean) as string[];

      const nextTree = {
        ...state.layoutTree,
        nodes: {
          ...state.layoutTree.nodes,
          [parentNode.id]: { ...parentNode, children: nodeIds },
        },
      };

      state.commit(
        { layoutTree: nextTree },
        { label: "reorder", batchKey: "reorder", batchWindowMs: 800 }
      );
    },
    [blockIdToNodeId]
  );

  const removeBlockNode = useCallback(
    (blockId: string) => {
      const nodeId = blockIdToNodeId.get(blockId);
      if (!nodeId) return;
      const state = useEditorStore.getState();
      const nextTree = removeNode(state.layoutTree, nodeId);
      const nextBlocks = { ...state.blocks.byId };
      delete nextBlocks[blockId];
      state.commit(
        {
          layoutTree: nextTree,
          blocks: { byId: nextBlocks },
          selection: { nodeId: null, blockId: null },
        },
        { label: "remove-block" }
      );
    },
    [blockIdToNodeId]
  );

  const removeSection = useCallback((sectionId: string) => {
    const state = useEditorStore.getState();
    const rootId = state.layoutTree.rootId ?? ROOT_ID;
    if (sectionId === rootId) return;

    const blockIds: string[] = [];
    const stack = [sectionId];
    while (stack.length) {
      const current = stack.pop();
      if (!current) continue;
      const node = state.layoutTree.nodes[current];
      if (!node) continue;
      if (node.type === "block") {
        blockIds.push(node.blockId);
      }
      stack.push(...node.children);
    }

    const nextTree = removeNode(state.layoutTree, sectionId);
    const nextBlocks = { ...state.blocks.byId };
    for (const blockId of blockIds) {
      delete nextBlocks[blockId];
    }

    state.commit(
      {
        layoutTree: nextTree,
        blocks: { byId: nextBlocks },
        selection: { nodeId: null, blockId: null },
      },
      { label: "remove-section" }
    );
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const active = String(event.active.id);
      const over = event.over ? String(event.over.id) : null;

      const blockType = getInserterType(event.active.data.current);

      setActiveId(null);
      setOverId(null);

      if (blockType) {
        if (!event.over) return;
        const overIndex = getOverIndex(event.over.data.current);
        const containerId =
          fromContainerId(over ?? "") ?? blockIdToContainerId.get(over ?? "");
        const insertAt =
          typeof overIndex === "number"
            ? overIndex
            : containerId
              ? blocksByContainer.get(containerId)?.length ?? 0
              : 0;
        insertBlock(blockType, insertAt, containerId ?? undefined);
        return;
      }

      if (!over || active === over) return;
      const sourceContainer = blockIdToContainerId.get(active);
      const targetContainer =
        fromContainerId(over) ?? blockIdToContainerId.get(over);
      if (!sourceContainer || !targetContainer) return;

      const sourceList = blocksByContainer.get(sourceContainer) ?? [];
      const targetList = blocksByContainer.get(targetContainer) ?? [];

      if (sourceContainer === targetContainer) {
        const oldIndex = sourceList.indexOf(active);
        const newIndex = targetList.indexOf(over);
        if (oldIndex === -1 || newIndex === -1) return;
        const reordered = arrayMove(sourceList, oldIndex, newIndex);
        reorderBlocks(reordered, sourceContainer);
        return;
      }

      const nodeId = blockIdToNodeId.get(active);
      if (!nodeId) return;
      const overIndex = targetList.indexOf(over);
      const insertAt = overIndex === -1 ? targetList.length : overIndex;

      const state = useEditorStore.getState();
      const nextTree = moveNode(state.layoutTree, nodeId, targetContainer, insertAt);
      state.commit({ layoutTree: nextTree }, { label: "move-block" });
    },
    [
      blockIdToContainerId,
      blockIdToNodeId,
      blocksByContainer,
      insertBlock,
      reorderBlocks,
    ]
  );

  const handleInsert = useCallback(
    (definition: BlockDefinition) => {
      insertBlock(definition.type, undefined, activeContainerId ?? undefined);
    },
    [insertBlock, activeContainerId]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Backspace" && event.key !== "Delete") return;
      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      ) {
        return;
      }
      const selected = useEditorStore.getState().selection.blockId;
      if (!selected) return;
      event.preventDefault();
      removeBlockNode(selected);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [removeBlockNode]);

  const dropPositionByContainer = useMemo(() => {
    const positions = new Map<string, DropIndicatorPosition | null>();
    for (const [containerId, blockIds] of blocksByContainer.entries()) {
      positions.set(containerId, getDropPosition(blockIds, activeId, overId));
    }
    return positions;
  }, [blocksByContainer, activeId, overId]);

  if (!ready) {
    return (
      <div className="ui-surface-card rounded-2xl p-6 text-sm text-[color:var(--text-secondary)]">
        Loading builder…
      </div>
    );
  }

  const gridClass = leftSidebarOpen && rightSidebarOpen
    ? "lg:grid-cols-[280px_1fr_320px]"
    : leftSidebarOpen
      ? "lg:grid-cols-[280px_1fr]"
      : rightSidebarOpen
        ? "lg:grid-cols-[1fr_320px]"
        : "lg:grid-cols-[1fr]";

  return (
    <div className={cn("grid gap-6", gridClass)}>
      {leftSidebarOpen ? (
        <BlockInserter
          definitions={builderDefinitions}
          onInsert={handleInsert}
          onHide={() => setUi({ leftSidebarOpen: false })}
        />
      ) : null}

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
              Builder
            </span>
            <span className="text-[color:var(--text-secondary)]">
              {dirty ? "Unsaved changes" : "All changes saved"}
            </span>
            <button
              type="button"
              onClick={() => setUi({ leftSidebarOpen: !leftSidebarOpen })}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] hover:border-white/20"
            >
              {leftSidebarOpen ? "Hide blocks" : "Show blocks"}
            </button>
            <button
              type="button"
              onClick={() => setUi({ rightSidebarOpen: !rightSidebarOpen })}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] hover:border-white/20"
            >
              {rightSidebarOpen ? "Hide inspector" : "Show inspector"}
            </button>
          </div>
          <button
            type="button"
            onClick={insertSection}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[color:var(--text-secondary)] hover:border-white/20"
          >
            + Section
          </button>
          <span
            className="text-xs text-[color:var(--text-secondary)]"
            role="status"
            aria-live="polite"
          >
            {autosave.status === "saving"
              ? "Saving…"
              : autosave.status === "error"
              ? autosave.error ?? "Save failed"
              : "Autosave on"}
          </span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={() => {
            setActiveId(null);
            setOverId(null);
          }}
          modifiers={[restrictToFirstScrollableAncestor]}
        >
          <div className="space-y-6">
            {sectionIds.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[color:var(--text-secondary)]">
                Add a section to start building.
              </div>
            ) : null}
            {sectionIds.map((sectionId, sectionIndex) => {
              const columnIds = columnsBySection.get(sectionId) ?? [];
              const hasColumns = columnIds.length > 0;
              const sectionContainerId = hasColumns ? columnIds[0] : sectionId;

              return (
                <div
                  key={sectionId}
                  className={cn(
                    "rounded-3xl border border-white/10 bg-[color:var(--surface-card)]/60 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl",
                    activeContainerId === sectionContainerId
                      ? "ring-1 ring-cyan-200/40"
                      : ""
                  )}
                >
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                    <span>Section {sectionIndex + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          addColumn(sectionId);
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]"
                      >
                        + Column
                      </button>
                      {sectionId !== layoutTree.rootId ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeSection(sectionId);
                          }}
                          className="rounded-full border border-red-400/30 bg-red-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-red-200"
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {hasColumns ? (
                    <div
                      className={cn(
                        "grid gap-4",
                        columnIds.length === 1 && "md:grid-cols-1",
                        columnIds.length === 2 && "md:grid-cols-2",
                        columnIds.length === 3 && "md:grid-cols-3",
                        columnIds.length === 4 && "md:grid-cols-4"
                      )}
                    >
                      {columnIds.map((columnId) => (
                        <ContainerCanvas
                          key={columnId}
                          containerId={columnId}
                          blockIds={blocksByContainer.get(columnId) ?? []}
                          blockRefById={blockRefById}
                          activeId={activeId}
                          overId={overId}
                          dropPosition={dropPositionByContainer.get(columnId) ?? null}
                          onRemove={removeBlockNode}
                          onActivateContainer={() => setActiveContainerId(columnId)}
                          isActive={activeContainerId === columnId}
                        />
                      ))}
                    </div>
                  ) : (
                    <ContainerCanvas
                      containerId={sectionId}
                      blockIds={blocksByContainer.get(sectionId) ?? []}
                      blockRefById={blockRefById}
                      activeId={activeId}
                      overId={overId}
                      dropPosition={dropPositionByContainer.get(sectionId) ?? null}
                      onRemove={removeBlockNode}
                      onActivateContainer={() => setActiveContainerId(sectionId)}
                      isActive={activeContainerId === sectionId}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeBlock ? (
              <div className="rounded-2xl border border-cyan-200/50 bg-[color:var(--surface-card)]/80 p-4 shadow-2xl backdrop-blur">
                {renderBlock(activeBlock)}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {rightSidebarOpen ? (
        <Inspector onHide={() => setUi({ rightSidebarOpen: false })} />
      ) : null}
    </div>
  );
}

function renderBlock(block: Block) {
  const Component = getBlockComponent(block.type);
  if (!Component) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-[color:var(--text-secondary)]">
        Missing block: {block.type}
      </div>
    );
  }
  return (
    <Suspense fallback={null}>
      <Component block={block} />
    </Suspense>
  );
}
