import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/config/languages";

export default function PrivacyRedirect() {
  redirect(`/${DEFAULT_LOCALE}/privacy`);
}
