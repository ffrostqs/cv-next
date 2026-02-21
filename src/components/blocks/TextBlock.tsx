"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";
import { useEditorStore } from "@/lib/editor/store";
import { getTextStyle } from "@/components/blocks/textStyles";

const EMPTY_CONTENT: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

function resolveContent(block: Block): JSONContent {
  const content = block.props?.content;
  if (content && typeof content === "object") {
    return content as JSONContent;
  }
  return EMPTY_CONTENT;
}

function useBlockSync(block: Block) {
  const upsertBlock = useEditorStore((state) => state.upsertBlock);
  const lastContentRef = useRef<string>("");
  const blockRef = useRef(block);

  useEffect(() => {
    blockRef.current = block;
  }, [block]);

  return {
    lastContentRef,
    syncContent: (content: JSONContent) => {
      const serialized = JSON.stringify(content);
      if (serialized === lastContentRef.current) return;
      lastContentRef.current = serialized;
      const current = blockRef.current;
      upsertBlock(
        {
          ...current,
          props: {
            ...current.props,
            content,
          },
        },
        { recordHistory: false, dirty: true }
      );
    },
  };
}

function ToolbarButton({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-2.5 py-1 text-xs font-medium transition",
        active
          ? "border-cyan-200/60 bg-white/10 text-[color:var(--text-primary)]"
          : "border-white/10 text-[color:var(--text-secondary)] hover:border-white/20"
      )}
    >
      {label}
    </button>
  );
}

function TextBlock({ block }: { block: Block }) {
  const content = useMemo(
    () => resolveContent(block),
    [block.id, block.props?.content]
  );
  const { lastContentRef, syncContent } = useBlockSync(block);
  const pendingFrame = useRef<number | null>(null);
  const latestContentRef = useRef<JSONContent | null>(null);
  const textStyle = getTextStyle(block.style);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something memorable…",
      }),
    ],
    []
  );

  const editor = useEditor(
    {
      extensions,
      content,
      editorProps: {
        attributes: {
          class: "ui-tiptap min-h-[120px] outline-none",
        },
      },
      onUpdate: ({ editor: next }) => {
        latestContentRef.current = next.getJSON();
        if (pendingFrame.current) {
          cancelAnimationFrame(pendingFrame.current);
        }
        pendingFrame.current = requestAnimationFrame(() => {
          if (latestContentRef.current) {
            syncContent(latestContentRef.current);
          }
          pendingFrame.current = null;
        });
      },
      immediatelyRender: false,
    },
    [block.id]
  );

  useEffect(() => {
    return () => {
      if (pendingFrame.current) {
        cancelAnimationFrame(pendingFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!editor) return;
    const serialized = JSON.stringify(content);
    if (lastContentRef.current && lastContentRef.current === serialized) {
      return;
    }
    lastContentRef.current = serialized;
    editor.commands.setContent(content, false);
  }, [content, editor, lastContentRef]);

  if (!editor) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-[color:var(--text-secondary)]">
        Loading editor…
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
      style={textStyle}
    >
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <ToolbarButton
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="Bullets"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Numbered"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("Enter a URL", previousUrl ?? "https://");
            if (url === null) return;
            if (!url) {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        />
      </div>

      <div className="mt-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default memo(TextBlock);
