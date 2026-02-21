import type { Block } from "@/lib/blocks";
import type { LayoutTree, SectionNode } from "@/lib/editor/layout-tree";
import type { BlocksState } from "@/lib/editor/store";
import { createSectionNode } from "@/lib/editor/layout-tree";

export type PageContent = {
  version: "1";
  layoutTree: LayoutTree;
  blocks: BlocksState;
};

const ROOT_ID = "root";

function ensureRoot(layoutTree?: LayoutTree): LayoutTree {
  if (!layoutTree) {
    const root = createSectionNode(ROOT_ID);
    return { rootId: root.id, nodes: { [root.id]: root } };
  }

  if (layoutTree.rootId && layoutTree.nodes[layoutTree.rootId]) {
    return layoutTree;
  }

  const root: SectionNode =
    layoutTree.nodes[ROOT_ID] ??
    createSectionNode(ROOT_ID, { children: [] });

  return {
    rootId: root.id,
    nodes: {
      ...layoutTree.nodes,
      [root.id]: root,
    },
  };
}

export function createEmptyPageContent(): PageContent {
  return {
    version: "1",
    layoutTree: ensureRoot(),
    blocks: { byId: {} },
  };
}

function isBlocksState(value: unknown): value is BlocksState {
  if (!value || typeof value !== "object") return false;
  return "byId" in (value as BlocksState);
}

function normalizeBlocks(value: unknown): BlocksState {
  if (isBlocksState(value)) return value;
  if (Array.isArray(value)) {
    const byId: Record<string, Block> = {};
    for (const block of value as Block[]) {
      if (block && typeof block === "object" && "id" in block) {
        byId[(block as Block).id] = block as Block;
      }
    }
    return { byId };
  }
  return { byId: {} };
}

export function coercePageContent(value: unknown): PageContent {
  if (!value || typeof value !== "object") {
    return createEmptyPageContent();
  }

  const raw = value as Partial<PageContent>;
  const layoutTree = ensureRoot(raw.layoutTree);
  const blocks = normalizeBlocks(raw.blocks);

  return {
    version: "1",
    layoutTree,
    blocks,
  };
}
