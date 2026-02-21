"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await signOut({ callbackUrl: "/admin/login" });
    });
  }

  return (
    <button className="ui-link" onClick={handleLogout} disabled={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
