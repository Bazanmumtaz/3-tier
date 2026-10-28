import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-auth";
import { site } from "@/lib/site";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const raw = search["redirect"];
    return typeof raw === "string" && raw.startsWith("/") ? { redirect: raw } : {};
  },
  head: () => ({
    meta: [
      { title: `Sign in — ${site.name}` },
      {
        name: "description",
        content:
          "Sign in to your account, or create one, to send messages to the studio.",
      },
      { property: "og:title", content: `Sign in — ${site.name}` },
      {
        property: "og:description",
        content:
          "Sign in to your account, or create one, to send messages to the studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const session = useSession();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Same-origin path only — never bounce through an external URL.
  const search = Route.useSearch();
  const returnTo = typeof search.redirect === "string" && search.redirect.startsWith("/")
    ? search.redirect
    : "/";

  // Already signed in? Go home.
  useEffect(() => {
    if (session) navigate({ to: returnTo, replace: true });
  }, [session, navigate, returnTo]);

  async function handleEmailSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast.error(error.message);
          return;
        }
        navigate({ to: returnTo, replace: true });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        setAwaitingConfirmation(true);
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        setResetSent(true);
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "lovable") {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Could not start sign-in. Please try again.");
      return;
    }
    // Full-page flows redirect the browser from here.
  }

  if (awaitingConfirmation) {
    return (
      <AuthShell>
        <h1 className="text-3xl">Check your email</h1>
        <p className="mt-3 text-muted-foreground">
          We sent a confirmation link to <strong>{email}</strong>. Click it to
          activate your account, then sign in.
        </p>
      </AuthShell>
    );
  }

  if (resetSent) {
    return (
      <AuthShell>
        <h1 className="text-3xl">Reset link sent</h1>
        <p className="mt-3 text-muted-foreground">
          If an account exists for <strong>{email}</strong>, a reset link is on its
          way. It opens the page where you can set a new password.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="text-center">
        <h1 className="text-3xl">
          {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create an account" : "Reset your password"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "forgot"
            ? "Enter your email and we'll send you a reset link."
            : `Sign in to send messages to ${site.name}.`}
        </p>
      </div>

      {mode !== "forgot" && (
        <div className="grid gap-3">
          <Button type="button" variant="outline" size="lg" onClick={() => handleSocialSignIn("google")} disabled={busy}>
            Continue with Google
          </Button>
          <button
            type="button"
            className="lovable-auth-button"
            onClick={() => handleSocialSignIn("lovable")}
            disabled={busy}
          >
            Continue with Lovable
          </button>
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        {mode !== "forgot" && (
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
          </div>
        )}
        <Button type="submit" size="lg" disabled={busy}>
          {busy
            ? "One moment…"
            : mode === "signin"
              ? "Sign in"
              : mode === "signup"
                ? "Create account"
                : "Send reset link"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {mode === "signin" && (
          <>
            <button
              type="button"
              className="text-foreground underline-offset-4 hover:underline"
              onClick={() => setMode("forgot")}
            >
              Forgot your password?
            </button>
            <p className="mt-2">
              New here?{" "}
              <button
                type="button"
                className="text-foreground underline-offset-4 hover:underline"
                onClick={() => setMode("signup")}
              >
                Create an account
              </button>
            </p>
          </>
        )}
        {mode === "signup" && (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="text-foreground underline-offset-4 hover:underline"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          </p>
        )}
        {mode === "forgot" && (
          <p>
            Remembered it?{" "}
            <button
              type="button"
              className="text-foreground underline-offset-4 hover:underline"
              onClick={() => setMode("signin")}
            >
              Back to sign in
            </button>
          </p>
        )}
      </div>
    </AuthShell>
  );
}

function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rise-in rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
