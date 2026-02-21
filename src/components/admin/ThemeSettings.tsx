"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/components/ui/utils";
import { useThemeTokens } from "@/lib/theme";
import { THEMES } from "@/lib/theme";

export function ThemeSettings() {
  const [mounted, setMounted] = useState(false);
  const { themeName, mode, tokens, setThemeName, setDark, setLight } =
    useThemeTokens();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = useMemo(() => Object.values(THEMES), []);

  return (
    <div className="ui-surface-card rounded-2xl p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Theme</h3>
          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
            Switch the global design theme and mode. Changes apply immediately.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[color:var(--text-secondary)]">
          {mounted ? `${themeName} · ${mode}` : "Loading…"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm">Theme preset</span>
          <select
            value={themeName}
            onChange={(event) => setThemeName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          >
            {themes.map((theme) => (
              <option key={theme.slug} value={theme.slug}>
                {theme.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="text-sm">Mode</span>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={setLight}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition",
                mounted && mode === "light"
                  ? "border-cyan-200/60 bg-white/10 text-[color:var(--text-primary)]"
                  : "border-white/10 text-[color:var(--text-secondary)] hover:border-white/20"
              )}
            >
              Light
            </button>
            <button
              type="button"
              onClick={setDark}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition",
                mounted && mode === "dark"
                  ? "border-cyan-200/60 bg-white/10 text-[color:var(--text-primary)]"
                  : "border-white/10 text-[color:var(--text-secondary)] hover:border-white/20"
              )}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Primary
          </p>
          <p className="mt-2 text-lg font-semibold" style={{ color: tokens["color-primary"] }}>
            Accent
          </p>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Buttons, links, and highlights.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Surface
          </p>
          <div
            className="mt-3 rounded-xl border border-white/10 p-3 text-sm"
            style={{
              background: tokens["surface-card"],
              color: tokens["text-primary"],
            }}
          >
            Card preview
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
            Text
          </p>
          <p className="mt-2 text-sm" style={{ color: tokens["text-primary"] }}>
            Primary text sample
          </p>
          <p className="mt-1 text-xs" style={{ color: tokens["text-secondary"] }}>
            Secondary text sample
          </p>
        </div>
      </div>
    </div>
  );
}
