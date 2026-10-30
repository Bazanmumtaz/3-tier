import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

let currentSession: Session | null = null;
let started = false;

const listeners = new Set<(session: Session | null) => void>();

function emit(session: Session | null) {
  currentSession = session;
  for (const listener of listeners) listener(session);
}

/**
 * Registers the app's single auth listener. Call once from the root route
 * on the client; identity transitions also notify app-level callbacks so
 * the router and query cache can react.
 */
export function startAuthListener(
  onIdentityChange?: (event: "SIGNED_IN" | "SIGNED_OUT" | "USER_UPDATED") => void,
) {
  if (started) return;
  started = true;

  supabase.auth.onAuthStateChange((event, session) => {
    if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
    emit(session);
    onIdentityChange?.(event);
  });

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) emit(data.session);
  });
}

/** Reactive session state for UI (null while signed out). */
export function useSession() {
  const [session, setSession] = useState<Session | null>(currentSession);

  useEffect(() => {
    listeners.add(setSession);
    return () => {
      listeners.delete(setSession);
    };
  }, []);

  return session;
}
