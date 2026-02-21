// src/app/(public)/[locale]/not-found.tsx
import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { getDefaultLocale } from "@/lib/locales";
import type { CSSProperties } from "react";

interface Props {
  params?: Promise<{ locale?: string }>;
}

export default async function NotFoundPage({ params }: Props) {
  const resolved = params ? await params : undefined;
  const defaultLocale = await getDefaultLocale();
  const locale = resolved?.locale ?? defaultLocale?.code ?? "de";

  const dict = await getDictionary(locale);
  const t = dict.notFound;

  return (
    <main style={styles.wrapper}>
      <h1 style={styles.code}>404</h1>

      <h2 style={styles.title}>{t.title}</h2>
      <p style={styles.desc}>{t.description}</p>

      <Link href={`/${locale}`} style={styles.link}>
        {t.backToHome}
      </Link>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    fontFamily: "system-ui",
    padding: "4rem",
    textAlign: "center",
  },
  code: {
    fontSize: "5rem",
    fontWeight: 800,
  },
  title: {
    fontSize: "1.8rem",
  },
  desc: {
    opacity: 0.7,
    marginBottom: "2rem",
  },
  link: {
    fontWeight: 600,
    textDecoration: "underline",
  },
};
