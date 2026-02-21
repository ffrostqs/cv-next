import type { Block } from "@/lib/blocks";

export type LayoutNodeType = "section" | "column" | "block";
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl";

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type LayoutConfig = {
  display?: "grid" | "flex" | "stack";
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number | string>;
  align?: ResponsiveValue<"start" | "center" | "end" | "stretch">;
  justify?: ResponsiveValue<"start" | "center" | "end" | "between">;
  padding?: ResponsiveValue<number | string>;
  maxWidth?: ResponsiveValue<number | string>;
};

export type LayoutNodeBase = {
  id: string;
  type: LayoutNodeType;
  parentId: string | null;
  children: string[];
  layout?: LayoutConfig;
  style?: Record<string, unknown>;
  meta?: Record<string, unknown>;
};

export type SectionNode = LayoutNodeBase & {
  type: "section";
};

export type ColumnNode = LayoutNodeBase & {
  type: "column";
  span?: ResponsiveValue<number>;
  minWidth?: ResponsiveValue<number | string>;
};

export type BlockNode = LayoutNodeBase & {
  type: "block";
  blockId: Block["id"];
};

export type LayoutNode = SectionNode | ColumnNode | BlockNode;

export type LayoutTree = {
  rootId: string | null;
  nodes: Record<string, LayoutNode>;
};

export function createLayoutTree(root?: SectionNode): LayoutTree {
  if (!root) {
    return { rootId: null, nodes: {} };
  }
  return {
    rootId: root.id,
    nodes: { [root.id]: root },
  };
}

export function createSectionNode(id: string, options?: Partial<SectionNode>): SectionNode {
  return {
    id,
    type: "section",
    parentId: null,
    children: [],
    ...options,
  };
}

export function createColumnNode(
  id: string,
  parentId: string | null,
  options?: Partial<ColumnNode>
): ColumnNode {
  return {
    id,
    type: "column",
    parentId,
    children: [],
    ...options,
  };
}

export function createBlockNode(
  id: string,
  parentId: string | null,
  blockId: Block["id"],
  options?: Partial<BlockNode>
): BlockNode {
  return {
    id,
    type: "block",
    parentId,
    children: [],
    blockId,
    ...options,
  };
}

export function isSectionNode(node: LayoutNode): node is SectionNode {
  return node.type === "section";
}

export function isColumnNode(node: LayoutNode): node is ColumnNode {
  return node.type === "column";
}

export function isBlockNode(node: LayoutNode): node is BlockNode {
  return node.type === "block";
}

export function getNode(tree: LayoutTree, id: string): LayoutNode | undefined {
  return tree.nodes[id];
}

export function getChildren(tree: LayoutTree, id: string): LayoutNode[] {
  const node = tree.nodes[id];
  if (!node) return [];
  return node.children.map((childId) => tree.nodes[childId]).filter(Boolean) as LayoutNode[];
}

export function appendChild(tree: LayoutTree, parentId: string, child: LayoutNode): LayoutTree {
  const parent = tree.nodes[parentId];
  if (!parent) return tree;
  return {
    ...tree,
    nodes: {
      ...tree.nodes,
      [parentId]: {
        ...parent,
        children: [...parent.children, child.id],
      },
      [child.id]: child,
    },
  };
}

export function insertChild(
  tree: LayoutTree,
  parentId: string,
  child: LayoutNode,
  index: number
): LayoutTree {
  const parent = tree.nodes[parentId];
  if (!parent) return tree;
  const nextChildren = [...parent.children];
  const insertAt = Math.max(0, Math.min(index, nextChildren.length));
  nextChildren.splice(insertAt, 0, child.id);
  return {
    ...tree,
    nodes: {
      ...tree.nodes,
      [parentId]: { ...parent, children: nextChildren },
      [child.id]: child,
    },
  };
}

export function removeNode(tree: LayoutTree, nodeId: string): LayoutTree {
  const nodes = { ...tree.nodes };
  const node = nodes[nodeId];
  if (!node) return tree;

  const stack = [nodeId];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    const currentNode = nodes[current];
    if (currentNode) {
      stack.push(...currentNode.children);
      delete nodes[current];
    }
  }

  if (node.parentId && nodes[node.parentId]) {
    const parent = nodes[node.parentId];
    nodes[node.parentId] = {
      ...parent,
      children: parent.children.filter((childId) => childId !== nodeId),
    };
  }

  return {
    rootId: tree.rootId === nodeId ? null : tree.rootId,
    nodes,
  };
}

export function moveNode(
  tree: LayoutTree,
  nodeId: string,
  nextParentId: string | null,
  index?: number
): LayoutTree {
  const nodes = { ...tree.nodes };
  const node = nodes[nodeId];
  if (!node) return tree;

  if (node.parentId && nodes[node.parentId]) {
    const prevParent = nodes[node.parentId];
    nodes[node.parentId] = {
      ...prevParent,
      children: prevParent.children.filter((childId) => childId !== nodeId),
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

  return {
    rootId: nextParentId === null ? nodeId : tree.rootId,
    nodes,
  };
}

export function traverseTree(tree: LayoutTree, visitor: (node: LayoutNode) => void) {
  if (!tree.rootId) return;
  const stack = [tree.rootId];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    const node = tree.nodes[current];
    if (!node) continue;
    visitor(node);
    stack.push(...node.children.slice().reverse());
  }
}

export function serializeResponsive<T>(value?: ResponsiveValue<T>): string | undefined {
  if (value === undefined) return undefined;
  return JSON.stringify(value);
}

export function resolveResponsive<T>(value?: ResponsiveValue<T>): T | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return value as T;
  }
  const responsive = value as Partial<Record<Breakpoint, T>>;
  return (
    responsive.base ??
    responsive.md ??
    responsive.lg ??
    responsive.sm ??
    responsive.xl
  );
}

export function toCssValue(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  return value;
}
