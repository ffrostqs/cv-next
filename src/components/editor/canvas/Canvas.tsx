"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
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
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";
import { BlockWrapper } from "./BlockWrapper";
import { DropIndicator, type DropIndicatorPosition } from "./DropIndicator";
import { DragOverlay } from "./DragOverlay";

function getDropPosition(
  blocks: Block[],
  activeId: string | null,
  overId: string | null
): DropIndicatorPosition | null {
  if (!activeId || !overId) return null;
  const activeIndex = blocks.findIndex((block) => block.id === activeId);
  const overIndex = blocks.findIndex((block) => block.id === overId);
  if (activeIndex === -1 || overIndex === -1) return null;
  return activeIndex < overIndex ? "below" : "above";
}

function SortableBlock({
  block,
  selected,
  onSelect,
  children,
  dropPosition,
  showDropIndicator,
}: {
  block: Block;
  selected?: boolean;
  onSelect?: (id: string) => void;
  children: ReactNode;
  dropPosition: DropIndicatorPosition | null;
  showDropIndicator: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as const;

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {showDropIndicator && dropPosition ? (
        <DropIndicator position={dropPosition} />
      ) : null}
      <BlockWrapper
        id={block.id}
        selected={selected}
        dragging={isDragging}
        onSelect={onSelect}
        className="cursor-grab active:cursor-grabbing"
      >
        <div {...attributes} {...listeners} className="absolute inset-0" />
        {children}
      </BlockWrapper>
    </div>
  );
}

export function Canvas({
  blocks,
  renderBlock,
  selectedId,
  onSelect,
  onReorder,
  className,
  emptyState,
}: {
  blocks: Block[];
  renderBlock: (block: Block) => ReactNode;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onReorder?: (nextOrder: string[]) => void;
  className?: string;
  emptyState?: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const ids = useMemo(() => blocks.map((block) => block.id), [blocks]);
  const activeBlock = blocks.find((block) => block.id === activeId) ?? null;
  const dropPosition = getDropPosition(blocks, activeId, overId);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    setOverId(event.over ? String(event.over.id) : null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const active = String(event.active.id);
    const over = event.over ? String(event.over.id) : null;

    setActiveId(null);
    setOverId(null);

    if (!over || active === over) return;
    const oldIndex = blocks.findIndex((block) => block.id === active);
    const newIndex = blocks.findIndex((block) => block.id === over);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(blocks, oldIndex, newIndex);
    onReorder?.(reordered.map((block) => block.id));
  }

  return (
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
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
    >
      <SortableContext items={ids}>
        <div
          className={cn(
            "rounded-3xl border border-white/10 bg-[color:var(--surface-card)]/60 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl",
            "space-y-4",
            className
          )}
        >
          {blocks.length === 0 && emptyState ? emptyState : null}
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              selected={selectedId === block.id}
              onSelect={onSelect}
              dropPosition={dropPosition}
              showDropIndicator={overId === block.id && activeId !== block.id}
            >
              {renderBlock(block)}
            </SortableBlock>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeBlock ? (
          <div className="rounded-2xl border border-cyan-200/50 bg-[color:var(--surface-card)]/80 p-4 shadow-2xl backdrop-blur">
            {renderBlock(activeBlock)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
