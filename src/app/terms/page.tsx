// src/app/terms/page.tsx
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/config/languages";

export default function TermsRedirect() {
  redirect(`/${DEFAULT_LOCALE}/terms`);
}
