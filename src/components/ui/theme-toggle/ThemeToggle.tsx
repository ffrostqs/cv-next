"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { AppIcon } from "@/icons";
import { Button } from "../button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <AppIcon name="light" size={18} />
      ) : (
        <AppIcon name="dark" size={18} />
      )}
    </Button>
  );
}
