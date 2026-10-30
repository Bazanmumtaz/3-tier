import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Visit</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.address}</p>
          <p className="text-sm text-muted-foreground">{site.hours}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Reach us</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.email}</p>
          <p className="text-sm text-muted-foreground">{site.phone}</p>
          <div className="mt-3 flex gap-3 text-sm">
            <Link
              to="/services"
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
