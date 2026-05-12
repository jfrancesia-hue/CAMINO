export function getPublicEnv() {
  return {
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  };
}

export function hasPublicSupabaseEnv() {
  const env = getPublicEnv();
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function requirePublicSupabaseEnv() {
  const env = getPublicEnv();

  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return env;
}
