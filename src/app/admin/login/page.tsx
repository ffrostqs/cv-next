import { SignInPanel } from "../signin/SignInPanel";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--surface-page)] text-[color:var(--text-primary)] px-6">
      <SignInPanel />
    </div>
  );
}
