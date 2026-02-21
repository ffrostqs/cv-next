"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";

type QuoteProps = {
  quote?: string;
  author?: string;
  role?: string;
};

function QuoteBlock({ block }: { block: Block }) {
  const props = block.props as QuoteProps;
  const quote = props.quote ?? "A short testimonial or quote goes here.";
  const author = props.author ?? "John Doe";
  const role = props.role ?? "Founder";

  return (
    <figure className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <blockquote className="text-lg text-[color:var(--text-primary)]">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4 text-sm text-[color:var(--text-secondary)]">
        {author} · {role}
      </figcaption>
    </figure>
  );
}

export default memo(QuoteBlock);
