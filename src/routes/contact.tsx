import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: "description",
        content:
          "Send the studio a message about your space, or find our address, hours, and phone number.",
      },
      { property: "og:title", content: `Contact — ${site.name}` },
      {
        property: "og:description",
        content:
          "Send the studio a message about your space, or find our address, hours, and phone number.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const session = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Prefill the email once the session arrives.
  useEffect(() => {
    if (session?.user.email && !email) setEmail(session.user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.email]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!session) return;

    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      user_id: session.user.id,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    setSending(false);

    if (error) {
      toast.error("Your message didn't send. Please try again.");
      return;
    }
    toast.success("Message sent — we'll reply within two working days.");
    setName("");
    setMessage("");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rise-in max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Contact
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">Tell us about your space.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A few lines are enough — we'll come back with questions, ideas, and a rough budget.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          {session ? (
            <form
              onSubmit={handleSubmit}
              className="rise-in rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Alex Rivera"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email || session.user.email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mt-5 grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Which room, what's not working, and when you'd like to start…"
                />
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </Button>
            </form>
          ) : (
            <div className="rise-in rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <h2 className="text-2xl">Sign in to send a message</h2>
              <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                Messages are tied to an account so nothing gets lost — and you can always see what
                you sent us.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link to="/auth">Sign in or create an account</Link>
              </Button>
            </div>
          )}
        </div>

        <aside className="md:col-span-2">
          <div className="rounded-2xl bg-secondary/60 p-8">
            <h2 className="text-xl">The studio</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Address</dt>
                <dd className="text-muted-foreground">{site.address}</dd>
              </div>
              <div>
                <dt className="font-semibold">Hours</dt>
                <dd className="text-muted-foreground">{site.hours}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="text-muted-foreground">{site.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone</dt>
                <dd className="text-muted-foreground">{site.phone}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
