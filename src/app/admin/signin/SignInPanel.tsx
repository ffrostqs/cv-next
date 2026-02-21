"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInPanel() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

    const response = await signIn("credentials", {
      password,
      redirect: false,
      callbackUrl,
    });

    if (response?.ok) {
      router.push(response.url ?? callbackUrl);
      return;
    }

    setLoading(false);
    setError("Invalid credentials");
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
