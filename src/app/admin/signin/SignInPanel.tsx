"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SignInPanel() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.href = "/admin";
      return;
    }

    setLoading(false);
    setError("Invalid password");
  }

  return (
    <div className="ui-surface-card p-8 rounded-2xl max-w-md mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
        Secure Admin
      </p>
      <h1 className="text-2xl font-semibold mt-3">Sign in to continue</h1>
      <p className="ui-text-muted mt-2">
        Enter the admin password to access the dashboard.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Admin password"
          className="w-full rounded-lg border border-[color:var(--border-muted)] bg-transparent px-4 py-2"
          required
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
