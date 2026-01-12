import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/config/languages";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
