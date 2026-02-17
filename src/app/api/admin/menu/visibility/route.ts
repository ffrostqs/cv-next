import { NextResponse } from "next/server";
import { updateMenuItemVisibility } from "@/lib/admin-actions";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const formData = new FormData();
  formData.set("menuItemId", String(body.menuItemId ?? ""));
  formData.set("locale", String(body.locale ?? ""));
  formData.set("scope", String(body.scope ?? ""));
  formData.set("isActive", String(body.isActive ?? ""));

  await updateMenuItemVisibility(formData);
  return NextResponse.json({ ok: true });
}
