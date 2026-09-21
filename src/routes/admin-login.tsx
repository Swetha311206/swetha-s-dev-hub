import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin-login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Swetha G Portfolio" },
      {
        name: "description",
        content: "Secure administrator sign-in for managing portfolio contact messages.",
      },
      { property: "og:title", content: "Admin Login — Swetha G Portfolio" },
      {
        property: "og:description",
        content: "Secure administrator sign-in for managing portfolio contact messages.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin-dashboard" });
    });
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Enter both email and password.");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setBusy(true);
    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin-dashboard` },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (data.session) {
        await supabase.rpc("claim_admin");
        navigate({ to: "/admin-dashboard" });
        return;
      }
      setMessage("Account created. Check your email to confirm, then sign in below.");
      setMode("signin");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setBusy(false);
      setError("Invalid credentials. Please try again.");
      return;
    }
    await supabase.rpc("claim_admin");
    setBusy(false);
    navigate({ to: "/admin-dashboard" });
  };

  return (
    <div className="hero-glow flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to portfolio
      </Link>

      <div className="card-surface w-full max-w-md p-7 sm:p-8">
        <span className="inline-flex rounded-lg bg-primary/12 p-2.5 text-primary">
          <ShieldCheck className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">
          {mode === "signin" ? "Admin Login" : "Create Admin Account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to view and manage contact messages."
            : "The first account created becomes the portfolio administrator."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={email}
              autoComplete="username"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              placeholder="admin@example.com"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              value={password}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Lock className="size-4" />
            {busy ? "Please wait..." : mode === "signin" ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
            setMessage("");
          }}
          className="mt-5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {mode === "signin"
            ? "First time? Create the admin account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
