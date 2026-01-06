import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "@/icons/icon.types";

/* ─────────────────────────────────────────────
 * Variants & sizes
 * ───────────────────────────────────────────── */
export type ButtonVariant = "primary" | "outline" | "ghost" | "menu";
export type ButtonSize = "sm" | "md" | "lg";

/* ─────────────────────────────────────────────
 * Native (DOM) props
 * - size прибираємо, бо конфліктує з UI size
 * - type залишаємо (button | submit | reset)
 * ───────────────────────────────────────────── */
export type ButtonNativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
>;

/* ─────────────────────────────────────────────
 * UI-only props (design-system)
 * ───────────────────────────────────────────── */
export interface ButtonUIProps {
  /** Visual variant */
  variant?: ButtonVariant;

  /** Visual size (maps to height / padding) */
  size?: ButtonSize;

  /** Optional left icon */
  iconLeft?: IconName;

  /** Optional right icon */
  iconRight?: IconName;

  /** Loading state (disables button + shows spinner) */
  isLoading?: boolean;

  /**
   * Render as Radix Slot instead of <button>
   * Enables polymorphic usage (Link, a, etc.)
   */
  asChild?: boolean;
}

/* ─────────────────────────────────────────────
 * ✅ Public API
 * - clean
 * - explicit
 * - slot-safe
 * ───────────────────────────────────────────── */
export type ButtonProps = ButtonNativeProps & ButtonUIProps;
