"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties, ElementType } from "react";
import type { Block } from "@/lib/blocks";
import { useEditorStore } from "@/lib/editor/store";
import { cn } from "@/components/ui/utils";

type InlineEditableTextProps = {
  block: Block;
  prop: string;
  fallback?: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  style?: CSSProperties;
  ariaLabel?: string;
};

export function InlineEditableText({
  block,
  prop,
  fallback = "",
  as: Tag = "span",
  className,
  multiline = false,
  style,
  ariaLabel,
}: InlineEditableTextProps) {
  const upsertBlock = useEditorStore((state) => state.upsertBlock);
  const ref = useRef<HTMLElement | null>(null);
  const value = useMemo(() => {
    const props = block.props as Record<string, unknown>;
    const raw = props[prop];
    return typeof raw === "string" ? raw : fallback;
  }, [block.props, fallback, prop]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.textContent !== value) {
      el.textContent = value;
    }
  }, [value]);

  const handleCommit = () => {
    const el = ref.current;
    if (!el) return;
    const nextValue = el.textContent ?? "";
    if (nextValue === value) return;
    upsertBlock(
      {
        ...block,
        props: {
          ...(block.props ?? {}),
          [prop]: nextValue,
        },
      },
      { label: "inline-edit", batchKey: `inline-${block.id}`, batchWindowMs: 800 }
    );
  };

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      style={style}
      aria-label={ariaLabel ?? prop}
      role="textbox"
      tabIndex={0}
      className={cn("outline-none focus:outline-none", className)}
      onBlur={handleCommit}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          (event.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}
