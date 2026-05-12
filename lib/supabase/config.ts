import { getPublicEnv, hasPublicSupabaseEnv } from "@/lib/env";

export function getSupabaseBrowserConfig() {
  const env = getPublicEnv();

  return {
    anonKey: env.supabaseAnonKey,
    url: env.supabaseUrl,
  };
}

export const hasSupabaseBrowserConfig = hasPublicSupabaseEnv;
