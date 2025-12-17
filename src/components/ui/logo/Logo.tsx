"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Code2 } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { LogoProps } from "./logo.types";
import {
  logoWrapperStyles,
  logoIconStyles,
  logoTextStyles,
} from "./logo.styles";
import type { Locale } from "@/i18n/config";

export function Logo({ className }: LogoProps) {
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <Link
      href={`/${locale}`}
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
