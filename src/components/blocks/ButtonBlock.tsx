"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { cn } from "@/components/ui/utils";

type ButtonProps = {
  label?: string;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
};

function ButtonBlock({ block }: { block: Block }) {
  const props = block.props as ButtonProps;
  const label = props.label ?? "Button";
  const href = props.href ?? "";
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const align = props.align ?? "left";

  const base = "inline-flex items-center justify-center rounded-full font-semibold transition";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-[color:var(--color-primary)] text-black hover:opacity-90",
    outline: "border border-white/20 text-[color:var(--text-primary)] hover:border-white/40",
    ghost: "text-[color:var(--text-primary)] hover:bg-white/10",
  };
  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const content = (
    <span className={cn(base, variants[variant], sizes[size])}>{label}</span>
  );

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {href ? (
        <a href={href} className="inline-block">
          {content}
        </a>
      ) : (
        <button type="button">{content}</button>
      )}
    </div>
  );
}

export default memo(ButtonBlock);
