"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";

type ListProps = {
  title?: string;
  items?: string[];
};

function ListBlock({ block }: { block: Block }) {
  const props = block.props as ListProps;
  const title = props.title ?? "List";
  const items = props.items ?? ["First item", "Second item", "Third item"];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h4 className="text-sm font-semibold text-[color:var(--text-primary)]">
        {title}
      </h4>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[color:var(--text-secondary)]">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default memo(ListBlock);
