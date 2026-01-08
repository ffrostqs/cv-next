import { SUPPORTED_LOCALES } from "@/config/languages";
import { TermsClient } from "@/sections/legal/Terms.client";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

export default function TermsPage() {
  return <TermsClient />;
}
