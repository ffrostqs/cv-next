"use client";

import type { ReactNode } from "react";
import { Fragment, Suspense, memo } from "react";
import type { Block } from "@/lib/blocks";
import { getBlockComponent } from "@/lib/blocks";

function BlockRendererComponent({
  blocks,
  fallback,
  loading,
}: {
  blocks: Block[];
  fallback?: (block: Block) => ReactNode;
  loading?: ReactNode;
}) {
  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((block) => {
        if (!block.enabled) return null;
        const Component = getBlockComponent(block.type);
        if (!Component) {
          return fallback ? (
            <Fragment key={block.id}>{fallback(block)}</Fragment>
          ) : null;
        }
        return (
          <Suspense key={block.id} fallback={loading ?? null}>
            <Component block={block} />
          </Suspense>
        );
      })}
    </>
  );
}

export const BlockRenderer = memo(BlockRendererComponent);
