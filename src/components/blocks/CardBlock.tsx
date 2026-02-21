"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type CardProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone?: "default" | "muted";
};

function CardBlock({ block }: { block: Block }) {
  const props = block.props as CardProps;
  const eyebrow = props.eyebrow ?? "Card";
  const title = props.title ?? "Card title";
  const body = props.body ?? "Add supporting copy for this card.";
  const imageUrl = props.imageUrl ?? "";
  const ctaLabel = props.ctaLabel ?? "Learn more";
  const ctaHref = props.ctaHref ?? "";
  const tone = props.tone ?? "default";

  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 p-5",
        tone === "muted" ? "bg-white/5" : "bg-white/10"
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="h-40 w-full rounded-2xl border border-white/10 object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-[color:var(--text-primary)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{body}</p>
        {ctaHref ? (
          <a
            href={ctaHref}
            className="mt-4 inline-flex text-sm font-semibold text-[color:var(--color-primary)]"
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default memo(CardBlock);
