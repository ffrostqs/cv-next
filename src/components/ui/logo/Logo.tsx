"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";

import { cn } from "@/components/ui/utils";
import type { LogoProps } from "./logo.types";
import {
  logoWrapperStyles,
  logoIconStyles,
  logoTextStyles,
} from "./logo.styles";

export function Logo({ href, className }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(logoWrapperStyles(), className)}
      aria-label="Go to homepage"
    >
      <div className={logoIconStyles()}>
        <Code2 size={18} aria-hidden />
      </div>

      <span className={logoTextStyles()}>Yevhenii&nbsp;Slivinskyi</span>
    </Link>
  );
}
