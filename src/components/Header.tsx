"use client";

import { Navigation } from "./Navigation";
import { Logo } from "@/components/ui/logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
