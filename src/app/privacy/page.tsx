import { redirect } from "next/navigation";
import { getDefaultLocale } from "@/lib/locales";

export default async function PrivacyRedirect() {
  const locale = await getDefaultLocale();
  redirect(`/${locale?.code ?? "de"}/privacy`);
}
