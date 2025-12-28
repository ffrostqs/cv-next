import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "@/icons/icon.types";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * DOM-only props
 * ❗ icon props тут заборонені
 */
export type ButtonNativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
>;

/**
 * UI-only props
 */
export interface ButtonUIProps {
  variant?: ButtonVariant;
  size?: ButtonSize;

  iconLeft?: IconName;
  iconRight?: IconName;

  isLoading?: boolean;
  asChild?: boolean;
}

/**
 * ✅ PUBLIC API
 */
export type ButtonProps = ButtonNativeProps & ButtonUIProps;
