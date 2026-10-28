import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: `Set a new password — ${site.name}` },
      {
        name: "description",
        content: "Choose a new password for your account.",
      },
      { property: "og:title", content: `Set a new password — ${site.name}` },
      {
        property: "og:description",
        content: "Choose a new password for your account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      // Recovery sessions are exempt from the current-password requirement.
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message);
        return;
      }
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rise-in rounded-2xl border border-border bg-card p-8 shadow-sm">
        {done ? (
          <div className="text-center">
            <h1 className="text-3xl">Password updated</h1>
            <p className="mt-3 text-muted-foreground">
              Your new password is set. Head back and sign in with it.
            </p>
            <Button asChild className="mt-6">
              <a href="/">Go home</a>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="text-center">
              <h1 className="text-3xl">Set a new password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose something you haven't used before.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">New password</Label>
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
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Saving…" : "Save new password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
