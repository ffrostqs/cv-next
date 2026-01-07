// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/languages";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return children;
}
