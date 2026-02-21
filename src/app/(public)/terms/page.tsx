// src/app/terms/page.tsx
import { redirect } from "next/navigation";
import { getDefaultLocale } from "@/lib/locales";

export default async function TermsRedirect() {
  const locale = await getDefaultLocale();
  redirect(`/${locale?.code ?? "de"}/terms`);
}
