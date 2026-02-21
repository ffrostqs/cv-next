"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Block } from "@/lib/blocks";
import type { LayoutNode, LayoutTree } from "@/lib/editor/layout-tree";
import { createBlockNode } from "@/lib/editor/layout-tree";

export type LayoutTreeState = LayoutTree;

export type BlocksState = {
  byId: Record<string, Block>;
};

export type SelectionState = {
  nodeId: string | null;
  blockId: string | null;
};

export type EditorPanel = "layers" | "blocks" | "inspector" | "settings" | null;

export type UiState = {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  activePanel: EditorPanel;
};

export type AutosaveStatus = "idle" | "saving" | "error";

export type AutosaveState = {
  status: AutosaveStatus;
  lastSavedAt: number | null;
  error: string | null;
  intervalMs: number;
};

export type EditorSnapshot = {
  layoutTree: LayoutTreeState;
  blocks: BlocksState;
  selection: SelectionState;
};

export type HistoryEntry = {
  snapshot: EditorSnapshot;
  timestamp: number;
  label?: string;
  batchKey?: string;
};

export type HistoryState = {
  past: HistoryEntry[];
  future: HistoryEntry[];
  maxSize: number;
};

export type CommitOptions = {
  recordHistory?: boolean;
  label?: string;
  dirty?: boolean;
  batchKey?: string;
  batchWindowMs?: number;
};

export type EditorStoreState = {
  layoutTree: LayoutTreeState;
  blocks: BlocksState;
  selection: SelectionState;
  history: HistoryState;
  ui: UiState;
  autosave: AutosaveState;
  dirty: boolean;
  revision: number;

  commit: (partial: Partial<EditorStoreState>, options?: CommitOptions) => void;
  setLayoutTree: (tree: LayoutTreeState, options?: CommitOptions) => void;
  setBlocks: (blocks: BlocksState, options?: CommitOptions) => void;
  setSelection: (selection: SelectionState) => void;
  clearSelection: () => void;

  upsertLayoutNode: (
    node: LayoutNode,
    options?: CommitOptions
  ) => void;
  removeLayoutNode: (nodeId: string, options?: CommitOptions) => void;
  moveLayoutNode: (
    nodeId: string,
    nextParentId: string | null,
    index?: number,
    options?: CommitOptions
  ) => void;

  upsertBlock: (block: Block, options?: CommitOptions) => void;
  removeBlock: (blockId: string, options?: CommitOptions) => void;
  duplicateBlock: (blockId: string) => void;

  setUi: (ui: Partial<UiState>) => void;
  setAutosave: (autosave: Partial<AutosaveState>) => void;

  undo: () => void;
  redo: () => void;
  setDirty: (value?: boolean) => void;
  markSaved: () => void;
};

const DEFAULT_HISTORY_LIMIT = 100;
const DEFAULT_HISTORY_BATCH_WINDOW = 800;
const DEFAULT_AUTOSAVE_INTERVAL = 20000;

function createId(prefix: string) {
  const base =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${base}`;
}

const emptyLayoutTree: LayoutTreeState = {
  rootId: null,
  nodes: {},
};

const emptyBlocks: BlocksState = {
  byId: {},
};

const emptySelection: SelectionState = {
  nodeId: null,
  blockId: null,
};

const initialHistory: HistoryState = {
  past: [],
  future: [],
  maxSize: DEFAULT_HISTORY_LIMIT,
};

const initialUi: UiState = {
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  activePanel: "inspector",
};

const initialAutosave: AutosaveState = {
  status: "idle",
  lastSavedAt: null,
  error: null,
  intervalMs: DEFAULT_AUTOSAVE_INTERVAL,
};

function createSnapshot(state: EditorStoreState): EditorSnapshot {
  return {
    layoutTree: state.layoutTree,
    blocks: state.blocks,
    selection: state.selection,
  };
}

function commitState(
  state: EditorStoreState,
  partial: Partial<EditorStoreState>,
  options?: CommitOptions
) {
  const recordHistory = options?.recordHistory ?? true;
  const dirtyOverride = options?.dirty;
  const batchKey = options?.batchKey;
  const batchWindowMs = options?.batchWindowMs ?? DEFAULT_HISTORY_BATCH_WINDOW;

  const next: Partial<EditorStoreState> = {
    ...partial,
  };

  if (recordHistory) {
    const now = Date.now();
    const past = state.history.past;
    const lastEntry = past[past.length - 1];
    const shouldBatch =
      batchKey &&
      lastEntry?.batchKey === batchKey &&
      now - lastEntry.timestamp <= batchWindowMs;

    if (shouldBatch) {
      next.history = {
        ...state.history,
        past: [...past.slice(0, -1), { ...lastEntry, timestamp: now }],
        future: [],
      };
    } else {
      const entry: HistoryEntry = {
        snapshot: createSnapshot(state),
        timestamp: now,
        label: options?.label,
        batchKey,
      };
      const extendedPast = [...past, entry];
      const limitedPast =
        extendedPast.length > state.history.maxSize
          ? extendedPast.slice(1)
          : extendedPast;
      next.history = {
        ...state.history,
        past: limitedPast,
        future: [],
      };
    }
  }

  if (dirtyOverride !== undefined) {
    next.dirty = dirtyOverride;
  } else if (recordHistory) {
    next.dirty = true;
  }

  next.revision = state.revision + 1;

  return next;
}

function collectSubtreeIds(nodes: Record<string, LayoutNode>, rootId: string) {
  const ids: string[] = [];
  const stack = [rootId];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    ids.push(current);
    const node = nodes[current];
    if (node) {
      stack.push(...node.children);
    }
  }
  return ids;
}

export const useEditorStore = create<EditorStoreState>()(
  subscribeWithSelector((set, get) => ({
    layoutTree: emptyLayoutTree,
    blocks: emptyBlocks,
    selection: emptySelection,
    history: initialHistory,
    ui: initialUi,
    autosave: initialAutosave,
    dirty: false,
    revision: 0,

    commit: (partial, options) => {
      set((state) => commitState(state, partial, options));
    },
    setLayoutTree: (tree, options) => {
      set((state) => commitState(state, { layoutTree: tree }, options));
    },
    setBlocks: (blocks, options) => {
      set((state) => commitState(state, { blocks }, options));
    },
    setSelection: (selection) => {
      set({ selection });
    },
    clearSelection: () => {
      set({ selection: emptySelection });
    },

    upsertLayoutNode: (node, options) => {
      set((state) => {
        const nodes = {
          ...state.layoutTree.nodes,
          [node.id]: node,
        };
        const layoutTree = {
          ...state.layoutTree,
          nodes,
        };
        return commitState(state, { layoutTree }, options);
      });
    },
    removeLayoutNode: (nodeId, options) => {
      set((state) => {
        const nodes = { ...state.layoutTree.nodes };
        const node = nodes[nodeId];
        if (!node) return {};

        const subtreeIds = collectSubtreeIds(nodes, nodeId);
        for (const id of subtreeIds) {
          delete nodes[id];
        }

        if (node.parentId && nodes[node.parentId]) {
          const parent = nodes[node.parentId];
          nodes[node.parentId] = {
            ...parent,
            children: parent.children.filter((child) => child !== nodeId),
          };
        }

        const layoutTree = {
          ...state.layoutTree,
          nodes,
          rootId: state.layoutTree.rootId === nodeId ? null : state.layoutTree.rootId,
        };

        return commitState(state, { layoutTree }, options);
      });
    },
    moveLayoutNode: (nodeId, nextParentId, index, options) => {
      set((state) => {
        const nodes = { ...state.layoutTree.nodes };
        const node = nodes[nodeId];
        if (!node) return {};

        if (node.parentId && nodes[node.parentId]) {
          const prevParent = nodes[node.parentId];
          nodes[node.parentId] = {
            ...prevParent,
            children: prevParent.children.filter((child) => child !== nodeId),
          };
        }

        if (nextParentId && nodes[nextParentId]) {
          const nextParent = nodes[nextParentId];
          const nextChildren = [...nextParent.children];
          const insertAt =
            index === undefined || index < 0 || index > nextChildren.length
              ? nextChildren.length
              : index;
          nextChildren.splice(insertAt, 0, nodeId);
          nodes[nextParentId] = {
            ...nextParent,
            children: nextChildren,
          };
        }

        nodes[nodeId] = {
          ...node,
          parentId: nextParentId,
        };

        const layoutTree = {
          ...state.layoutTree,
          nodes,
          rootId:
            nextParentId === null
              ? nodeId
              : state.layoutTree.rootId,
        };

        return commitState(state, { layoutTree }, options);
      });
    },

    upsertBlock: (block, options) => {
      set((state) => {
        const byId = {
          ...state.blocks.byId,
          [block.id]: block,
        };
        return commitState(state, { blocks: { byId } }, options);
      });
    },
    removeBlock: (blockId, options) => {
      set((state) => {
        if (!state.blocks.byId[blockId]) return {};
        const byId = { ...state.blocks.byId };
        delete byId[blockId];
        return commitState(state, { blocks: { byId } }, options);
      });
    },
    duplicateBlock: (blockId) => {
      set((state) => {
        const block = state.blocks.byId[blockId];
        if (!block) return {};

        const nodeEntry = Object.values(state.layoutTree.nodes).find(
          (node) => node.type === "block" && node.blockId === blockId
        );
        if (!nodeEntry || nodeEntry.type !== "block") return {};

        const parentId = nodeEntry.parentId;
        if (!parentId) return {};
        const parentNode = state.layoutTree.nodes[parentId];
        if (!parentNode) return {};

        const newBlockId = createId("block");
        const newNodeId = createId("node");
        const newBlock: Block = {
          ...block,
          id: newBlockId,
        };
        const newNode = createBlockNode(newNodeId, parentId, newBlockId);

        const insertIndex = parentNode.children.indexOf(nodeEntry.id);
        const nextChildren = [...parentNode.children];
        const targetIndex =
          insertIndex === -1 ? nextChildren.length : insertIndex + 1;
        nextChildren.splice(targetIndex, 0, newNodeId);

        const nextNodes = {
          ...state.layoutTree.nodes,
          [newNodeId]: newNode,
          [parentId]: { ...parentNode, children: nextChildren },
        };
        const nextBlocks = {
          ...state.blocks.byId,
          [newBlockId]: newBlock,
        };

        return commitState(
          state,
          {
            layoutTree: { ...state.layoutTree, nodes: nextNodes },
            blocks: { byId: nextBlocks },
            selection: { nodeId: newNodeId, blockId: newBlockId },
          },
          { label: "duplicate-block" }
        );
      });
    },

    setUi: (ui) => {
      set((state) => ({
        ui: { ...state.ui, ...ui },
      }));
    },
    setAutosave: (autosave) => {
      set((state) => ({
        autosave: { ...state.autosave, ...autosave },
      }));
    },

    undo: () => {
      set((state) => {
        const past = [...state.history.past];
        if (!past.length) return {};
        const entry = past.pop();
        if (!entry) return {};
        const futureEntry: HistoryEntry = {
          snapshot: createSnapshot(state),
          timestamp: Date.now(),
          label: "undo",
        };
        return {
          layoutTree: entry.snapshot.layoutTree,
          blocks: entry.snapshot.blocks,
          selection: entry.snapshot.selection,
          history: {
            ...state.history,
            past,
            future: [...state.history.future, futureEntry],
          },
          dirty: true,
          revision: state.revision + 1,
        };
      });
    },
    redo: () => {
      set((state) => {
        const future = [...state.history.future];
        if (!future.length) return {};
        const entry = future.pop();
        if (!entry) return {};
        const pastEntry: HistoryEntry = {
          snapshot: createSnapshot(state),
          timestamp: Date.now(),
          label: "redo",
        };
        return {
          layoutTree: entry.snapshot.layoutTree,
          blocks: entry.snapshot.blocks,
          selection: entry.snapshot.selection,
          history: {
            ...state.history,
            past: [...state.history.past, pastEntry],
            future,
          },
          dirty: true,
          revision: state.revision + 1,
        };
      });
    },
    setDirty: (value = true) => {
      set({ dirty: value });
    },
    markSaved: () => {
      set((state) => ({
        dirty: false,
        autosave: {
          ...state.autosave,
          status: "idle",
          error: null,
          lastSavedAt: Date.now(),
        },
      }));
    },
  }))
);
