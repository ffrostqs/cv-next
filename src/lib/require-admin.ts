import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== "ok") {
    redirect("/admin/signin");
  }
}
