"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type ImageProps = {
  src?: string;
  alt?: string;
  caption?: string;
  fit?: "cover" | "contain";
};

function ImageBlock({ block }: { block: Block }) {
  const props = block.props as ImageProps;
  const src = props.src ?? "";
  const alt = props.alt ?? "";
  const caption = props.caption ?? "";
  const fit = props.fit ?? "cover";

  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-4">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "h-64 w-full rounded-xl border border-white/10 bg-black/20 object-center",
            fit === "contain" ? "object-contain" : "object-cover"
          )}
          loading="lazy"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/20 text-sm text-[color:var(--text-secondary)]">
          Add image URL
        </div>
      )}
      {caption ? (
        <figcaption className="mt-3 text-xs text-[color:var(--text-secondary)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default memo(ImageBlock);
