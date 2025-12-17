"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toggleButton } from "./theme-toggle.styles";
import { cn } from "@/components/ui/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(toggleButton({ theme }))}
    >
      {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
