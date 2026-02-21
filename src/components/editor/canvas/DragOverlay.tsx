"use client";

import type { ReactNode } from "react";
import { memo } from "react";
import { DragOverlay as DndDragOverlay, defaultDropAnimation } from "@dnd-kit/core";

function DragOverlayComponent({ children }: { children: ReactNode }) {
  return (
    <DndDragOverlay
      dropAnimation={{
        ...defaultDropAnimation,
        duration: 180,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {children}
    </DndDragOverlay>
  );
}

export const DragOverlay = memo(DragOverlayComponent);
