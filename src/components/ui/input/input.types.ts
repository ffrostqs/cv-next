import type { InputHTMLAttributes } from "react";
import type { IconName } from "@/icons/lucideNew";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;

  size?: InputSize;

  iconLeft?: IconName;
  iconRight?: IconName;
}
