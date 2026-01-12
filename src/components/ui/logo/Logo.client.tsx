"use client";

import Link from "next/link";
import { cn } from "@/components/ui/utils";
import type { LogoProps } from "./logo.types";
import { logoWrapperStyles, logoIconStyles } from "./logo.styles";
import { AppIcon } from "@/icons";

interface Props extends LogoProps {
  label: string;
  name: string;
}

export function LogoClient({ href, className, label, name }: Props) {
  return (
    <Link
      href={href}
      className={cn(logoWrapperStyles(), className)}
      aria-label={label}
    >
      <div className={logoIconStyles()}>
        <AppIcon name="logo" size={18} aria-hidden />
      </div>

      <span className="ui-link ui-link--nav">{name}</span>
    </Link>
  );
}
