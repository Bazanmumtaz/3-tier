import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { services, site } from "@/lib/site";
import heroImage from "@/assets/hero-studio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${site.name} — Design & Build Studio`,
      },
      {
        name: "description",
        content:
          "Interior styling, custom furniture, and light renovations from a small studio that builds calm, well-made spaces.",
      },
      { property: "og:title", content: `${site.name} — Design & Build Studio` },
      {
        property: "og:description",
        content:
          "Interior styling, custom furniture, and light renovations from a small studio that builds calm, well-made spaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="rise-in">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Design · Build · Style
          </p>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">
            Quiet, well-made things for modern spaces.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            {site.tagline} We work room by room, with makers we know by name.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/services">See our services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
        <div className="rise-in delay-1 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={heroImage}
            alt="A sunlit studio living room in warm sand tones"
            width={1792}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Services preview */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl">What we do</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Three crafts, one standard: if it lives in your home for years, it should be built for
            it.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map((service, i) => (
              <div
                key={service.id}
                className={`rise-in delay-${i + 1} rounded-2xl border border-border bg-card p-6 shadow-sm`}
              >
                <span className="font-display text-2xl text-accent-foreground">
                  {service.number}
                </span>
                <h3 className="mt-3 text-xl">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="link" className="mt-8 px-0 text-primary">
            <Link to="/services">All services →</Link>
          </Button>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">
          Have a room that never quite works?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us about it. We reply to every message within two working days.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/contact">Start a conversation</Link>
        </Button>
      </section>
    </div>
  );
}
