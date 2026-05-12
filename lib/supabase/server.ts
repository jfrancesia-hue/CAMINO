import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { requirePublicSupabaseEnv } from "@/lib/env";

export async function createSupabaseServerClient() {
  const env = requirePublicSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, options, value }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies. Middleware and Server Actions can.
        }
      },
    },
  });
}
