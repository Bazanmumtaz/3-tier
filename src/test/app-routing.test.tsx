import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
function lastMatchId(path: string): string | undefined {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  return router.matchRoutes(path).at(-1)?.routeId;
}

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    expect(lastMatchId("/")).not.toBe(rootRouteId);
    expect(lastMatchId("/")).toBe("/");
  });

  it("matches pages for the three tiers and auth routes", () => {
    expect(lastMatchId("/services")).toBe("/services");
    expect(lastMatchId("/contact")).toBe("/contact");
    expect(lastMatchId("/auth")).toBe("/auth");
    expect(lastMatchId("/reset-password")).toBe("/reset-password");
  });

  it("does not match an unknown path", () => {
    expect(lastMatchId("/nowhere")).toBe(rootRouteId);
  });
});
