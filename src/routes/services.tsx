import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { process, services, site } from "@/lib/site";
import benchImage from "@/assets/services-bench.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services — ${site.name}` },
      {
        name: "description",
        content:
          "Interior styling, custom furniture, space planning, and light renovations — how each service works and what's included.",
      },
      { property: "og:title", content: `Services — ${site.name}` },
      {
        property: "og:description",
        content:
          "Interior styling, custom furniture, space planning, and light renovations — how each service works and what's included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6">
        <div className="rise-in max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl">Made to measure, in every sense.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Pick one service or combine them all — most projects start with a single
            stubborn room.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2">
        <div className="rise-in delay-1 overflow-hidden rounded-2xl shadow-lg md:order-1">
          <img
            src={benchImage}
            alt="A craftsman's workbench with tools, sketches, and clay pots"
            width={1312}
            height={1008}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:order-2">
          <h2 className="text-3xl">Every project, three steps</h2>
          <ol className="mt-8 space-y-8">
            {process.map((phase, i) => (
              <li key={phase.step} className="flex gap-4">
                <span className="font-display text-2xl text-accent-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl">{phase.step}</h3>
                  <p className="mt-1 text-muted-foreground">{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <span className="font-display text-2xl text-accent-foreground">
                  {service.number}
                </span>
                <h2 className="mt-3 text-2xl">{service.title}</h2>
                <p className="mt-2 text-muted-foreground">{service.summary}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Not sure which service fits? Tell us about the space and we'll suggest one.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/contact">Ask the studio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
