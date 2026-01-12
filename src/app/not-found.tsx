"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const i18n = {
  en: {
    title: "Page not found",
    desc: "This page does not exist or has been moved",
    back: "Back to homepage",
  },
  de: {
    title: "Seite nicht gefunden",
    desc: "Diese Seite existiert nicht oder wurde verschoben",
    back: "Zurück zur Startseite",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "de";
  const t = i18n[locale];

  return (
    <main
      className="
        relative min-h-screen
        flex items-center justify-center
        px-4
        bg-[color:var(--surface-base)]
        overflow-hidden
      "
    >
      {/* AMBIENT GLOW */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_15%_25%,rgba(236,72,153,0.15),transparent_40%),
              radial-gradient(circle_at_85%_75%,rgba(99,102,241,0.18),transparent_40%)]
        "
      />

      {/* CARD */}
      <section
        className="
          relative z-10
          w-full max-w-[420px]
          rounded-3xl
          bg-[color:var(--surface-elevated)]
          border border-[color:var(--border-muted)]
          p-8 sm:p-10
          text-center
          backdrop-blur-xl
          shadow-[0_0_90px_-30px_rgba(99,102,241,0.55)]
        "
      >
        {/* GLOW BORDER */}
        <div
          className="
            absolute -inset-[1px]
            rounded-3xl
            bg-gradient-to-r
            from-pink-500/30
            via-orange-400/30
            to-indigo-500/30
            blur-xl
            -z-10
          "
        />

        {/* 404 */}
        <h1
          className="
            text-[4.5rem] sm:text-[6rem]
            font-black leading-none mb-4
            bg-gradient-to-r
            from-pink-400
            via-orange-300
            to-indigo-400
            bg-clip-text
            text-transparent
            animate-[pulse_3s_ease-in-out_infinite]
          "
        >
          404
        </h1>

        {/* TITLE */}
        <h2
          className="
            text-xl sm:text-2xl
            font-semibold
            text-[color:var(--text-primary)]
            mb-2
          "
        >
          {t.title}
        </h2>

        {/* DESC */}
        <p
          className="
            text-sm sm:text-base
            text-[color:var(--text-secondary)]
            mb-8
          "
        >
          {t.desc}
        </p>

        {/* ACTION */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href={`/${locale}/`}>{t.back}</Link>
        </Button>
      </section>
    </main>
  );
}
