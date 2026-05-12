"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function cleanRedirectPath(value: FormDataEntryValue | null) {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : "/app";
}

function authError(path: "/login" | "/register", message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = cleanRedirectPath(formData.get("next"));

  if (!email || !password) {
    authError("/login", "Completa email y contrasena.");
  }

  let hasError = false;

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    hasError = Boolean(error);
  } catch {
    authError("/login", "Supabase no esta configurado todavia.");
  }

  if (hasError) {
    authError("/login", "No pudimos iniciar sesion con esos datos.");
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || password.length < 8) {
    authError("/register", "Usa nombre, email y una contrasena de al menos 8 caracteres.");
  }

  let hasError = false;

  try {
    const headerStore = await headers();
    const origin = headerStore.get("origin") ?? "http://localhost:3000";
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
      password,
    });
    hasError = Boolean(error);
  } catch {
    authError("/register", "Supabase no esta configurado todavia.");
  }

  if (hasError) {
    authError("/register", "No pudimos crear la cuenta. Revisa los datos e intenta de nuevo.");
  }

  redirect("/onboarding");
}

export async function signOutAction() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // If env is missing, still return the visitor to the public site.
  }

  redirect("/");
}
