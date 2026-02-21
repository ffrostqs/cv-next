"use client";

import type { ReactNode } from "react";
import { memo, useDeferredValue, useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { BlockCategory, BlockDefinition } from "@/lib/blocks";
import { BLOCK_CATEGORIES, listBlockDefinitions } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";
import { AppIcon } from "@/icons/AppIcon";

type InsertableBlock = {
  definition: BlockDefinition;
  category: BlockCategory;
  title: string;
  description?: string;
  searchText: string;
};

export const BLOCK_INSERTER_KIND = "block-inserter";

const DEFAULT_CATEGORY: BlockCategory = "Content";

function getCategory(definition: BlockDefinition): BlockCategory {
  return definition.category ?? DEFAULT_CATEGORY;
}

function buildSearchText(definition: BlockDefinition) {
  return [
    definition.title ?? definition.type,
    definition.description ?? "",
    definition.type,
    definition.category ?? "",
    ...(definition.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function useInsertableBlocks(definitions: BlockDefinition[]) {
  return useMemo<InsertableBlock[]>(
    () =>
      definitions.map((definition) => ({
        definition,
        category: getCategory(definition),
        title: definition.title ?? definition.type,
        description: definition.description,
        searchText: buildSearchText(definition),
      })),
    [definitions]
  );
}

function BlockCategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: BlockCategory[];
  active: BlockCategory | "all";
  onChange: (value: BlockCategory | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={cn(
          "rounded-full border px-3 py-1 text-xs font-medium transition",
          active === "all"
            ? "border-cyan-200/60 bg-white/10 text-[color:var(--text-primary)]"
            : "border-white/10 text-[color:var(--text-secondary)] hover:border-white/20"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition",
            active === category
              ? "border-cyan-200/60 bg-white/10 text-[color:var(--text-primary)]"
              : "border-white/10 text-[color:var(--text-secondary)] hover:border-white/20"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function StaticBlockCard({
  item,
  onInsert,
}: {
  item: InsertableBlock;
  onInsert?: (definition: BlockDefinition) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onInsert?.(item.definition)}
      className="group w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{item.title}</p>
          {item.description ? (
            <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
              {item.description}
            </p>
          ) : null}
        </div>
        <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          {item.category}
        </span>
      </div>
    </button>
  );
}

function DraggableBlockCard({
  item,
  onInsert,
}: {
  item: InsertableBlock;
  onInsert?: (definition: BlockDefinition) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-inserter:${item.definition.type}`,
    data: {
      kind: BLOCK_INSERTER_KIND,
      blockType: item.definition.type,
      category: item.category,
    },
  });

  return (
    <button
      type="button"
      ref={setNodeRef}
      onClick={() => {
        if (!isDragging) onInsert?.(item.definition);
      }}
      className={cn(
        "group w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/10",
        "cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-60" : "opacity-100"
      )}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{item.title}</p>
          {item.description ? (
            <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
              {item.description}
            </p>
          ) : null}
        </div>
        <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          {item.category}
        </span>
      </div>
    </button>
  );
}

function BlockInserterComponent({
  className,
  definitions,
  categories = BLOCK_CATEGORIES,
  enableDrag = true,
  onInsert,
  onHide,
  emptyState,
}: {
  className?: string;
  definitions?: BlockDefinition[];
  categories?: BlockCategory[];
  enableDrag?: boolean;
  onInsert?: (definition: BlockDefinition) => void;
  onHide?: () => void;
  emptyState?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlockCategory | "all">("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const registry = useMemo(
    () => definitions ?? listBlockDefinitions(),
    [definitions]
  );
  const insertables = useInsertableBlocks(registry);

  const filtered = useMemo(() => {
    return insertables.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!deferredQuery) return true;
      return item.searchText.includes(deferredQuery);
    });
  }, [activeCategory, deferredQuery, insertables]);

  const grouped = useMemo(() => {
    const byCategory = new Map<BlockCategory, InsertableBlock[]>();
    for (const category of categories) {
      byCategory.set(category, []);
    }
    for (const item of filtered) {
      const list = byCategory.get(item.category);
      if (list) list.push(item);
      else byCategory.set(item.category, [item]);
    }
    return Array.from(byCategory.entries()).filter(([, items]) => items.length > 0);
  }, [categories, filtered]);

  const Card = enableDrag ? DraggableBlockCard : StaticBlockCard;

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col rounded-3xl border border-white/10 bg-[color:var(--surface-card)]/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Insert
          </p>
          <h3 className="text-lg font-semibold">Blocks</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[color:var(--text-secondary)]">
            {filtered.length} items
          </span>
          {onHide ? (
            <button
              type="button"
              onClick={onHide}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] hover:border-white/20"
            >
              <AppIcon name="close" size={12} decorative />
              Hide blocks
            </button>
          ) : null}
        </div>
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Search blocks</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search blocks..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]"
        />
      </label>

      <div className="mt-4">
        <BlockCategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <div className="mt-5 flex-1 space-y-6 overflow-y-auto pr-1">
        {grouped.length ? (
          grouped.map(([category, items]) => (
            <section key={category} className="space-y-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[color:var(--text-secondary)]">
                <span>{category}</span>
                <span>{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={item.definition.type} item={item} onInsert={onInsert} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[color:var(--text-secondary)]">
            {emptyState ?? "No blocks match this search."}
          </div>
        )}
      </div>
    </aside>
  );
}

export const BlockInserter = memo(BlockInserterComponent);
