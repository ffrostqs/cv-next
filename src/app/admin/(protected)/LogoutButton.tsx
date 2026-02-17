"use client";

import { useTransition } from "react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/signin";
    });
  }

  return (
    <button className="ui-link" onClick={handleLogout} disabled={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
