"use client";

import type { CSSProperties, ReactNode } from "react";
import { Fragment, Suspense } from "react";
import type { Block } from "@/lib/blocks";
import { getBlockComponent } from "@/lib/blocks";
import type {
  LayoutNode,
  LayoutTree,
  ResponsiveValue,
} from "@/lib/editor/layout-tree";
import {
  getChildren,
  isBlockNode,
  isColumnNode,
  isSectionNode,
  resolveResponsive,
  serializeResponsive,
  toCssValue,
} from "@/lib/editor/layout-tree";
import { cn } from "@/components/ui/utils";

const DEFAULT_SECTION_COLUMNS = 1;

function toStyle(value?: ResponsiveValue<number | string>) {
  const resolved = resolveResponsive(value);
  return toCssValue(resolved);
}

function sectionStyle(node: LayoutNode): CSSProperties {
  const style: CSSProperties = {};
  const layout = node.layout;

  const columns = resolveResponsive(layout?.columns) ?? DEFAULT_SECTION_COLUMNS;
  style.display = layout?.display === "flex" ? "flex" : "grid";
  if (style.display === "grid") {
    style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }

  const gap = toStyle(layout?.gap);
  if (gap) style.gap = gap;

  const padding = toStyle(layout?.padding);
  if (padding) style.padding = padding;

  const maxWidth = toStyle(layout?.maxWidth);
  if (maxWidth) {
    style.maxWidth = maxWidth;
    style.marginInline = "auto";
  }

  return style;
}

function columnStyle(node: LayoutNode): CSSProperties {
  if (!isColumnNode(node)) return {};
  const style: CSSProperties = {};
  const span = resolveResponsive(node.span);
  if (span && span > 0) {
    style.gridColumn = `span ${span} / span ${span}`;
  }
  const minWidth = toCssValue(resolveResponsive(node.minWidth));
  if (minWidth) style.minWidth = minWidth;
  return style;
}

function nodeAttributes(node: LayoutNode) {
  return {
    "data-node-id": node.id,
    "data-node-type": node.type,
    "data-layout": serializeResponsive(node.layout),
  };
}

function renderBlock(
  block: Block | undefined,
  fallback?: (blockId: string) => ReactNode,
  loading?: ReactNode
) {
  if (!block) return fallback ? <Fragment>{fallback("missing")}</Fragment> : null;
  if (!block.enabled) return null;
  const Component = getBlockComponent(block.type);
  if (!Component) return fallback ? <Fragment>{fallback(block.id)}</Fragment> : null;
  return (
    <Suspense fallback={loading ?? null}>
      <Component block={block} />
    </Suspense>
  );
}

function renderNode(
  tree: LayoutTree,
  node: LayoutNode,
  blocks: Record<string, Block>,
  options: {
    loading?: ReactNode;
    missingNode?: (nodeId: string) => ReactNode;
    missingBlock?: (blockId: string) => ReactNode;
  }
): ReactNode {
  if (isBlockNode(node)) {
    return renderBlock(blocks[node.blockId], options.missingBlock, options.loading);
  }

  const children = getChildren(tree, node.id).map((child) =>
    renderNode(tree, child, blocks, options)
  );

  if (isColumnNode(node)) {
    return (
      <div
        key={node.id}
        {...nodeAttributes(node)}
        className="min-w-0"
        style={columnStyle(node)}
      >
        {children}
      </div>
    );
  }

  if (isSectionNode(node)) {
    return (
      <section
        key={node.id}
        {...nodeAttributes(node)}
        className={cn("grid gap-6")}
        style={sectionStyle(node)}
      >
        {children}
      </section>
    );
  }

  return null;
}

export function LayoutTreeRenderer({
  tree,
  blocks,
  className,
  loading,
  missingNode,
  missingBlock,
}: {
  tree: LayoutTree;
  blocks: Record<string, Block>;
  className?: string;
  loading?: ReactNode;
  missingNode?: (nodeId: string) => ReactNode;
  missingBlock?: (blockId: string) => ReactNode;
}) {
  if (!tree.rootId) return null;
  const root = tree.nodes[tree.rootId];
  if (!root) return missingNode ? <>{missingNode(tree.rootId)}</> : null;

  return (
    <div className={cn("space-y-6", className)}>
      {renderNode(tree, root, blocks, { loading, missingNode, missingBlock })}
    </div>
  );
}
