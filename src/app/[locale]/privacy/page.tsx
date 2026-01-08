import { SUPPORTED_LOCALES } from "@/config/languages";
import { PrivacyClient } from "@/sections/legal/Privacy.client";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

export default function PrivacyPage() {
  return <PrivacyClient />;
}
