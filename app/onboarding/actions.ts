"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function onboardingError(message: string): never {
  redirect(`/onboarding?error=${encodeURIComponent(message)}`);
}

export async function completeOnboardingAction(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const ageValue = String(formData.get("age") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const faithStatus = String(formData.get("faith_status") ?? "").trim();
  const emotionalState = String(formData.get("emotional_state") ?? "").trim();
  const searchingFor = String(formData.get("searching_for") ?? "").trim();
  const mainTopics = formData.getAll("main_topics").map(String).filter(Boolean);

  const age = ageValue ? Number(ageValue) : null;

  if (!fullName || !searchingFor || !faithStatus || !emotionalState || mainTopics.length === 0) {
    onboardingError("Completa las preguntas principales para personalizar Camino.");
  }

  if (age !== null && (!Number.isInteger(age) || age < 13 || age > 120)) {
    onboardingError("Ingresa una edad valida.");
  }

  let hasError = false;
  let needsLogin = false;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      needsLogin = true;
    } else {
      const { error } = await supabase
        .from("profiles")
        .update({
          age,
          city: city || null,
          country: country || null,
          emotional_state: `${emotionalState} | busca: ${searchingFor}`,
          faith_status: faithStatus,
          full_name: fullName,
          main_topics: mainTopics,
          onboarding_completed: true,
        })
        .eq("user_id", user.id);

      hasError = Boolean(error);
    }
  } catch {
    onboardingError("Supabase no esta configurado todavia o falta aplicar la migracion de perfiles.");
  }

  if (needsLogin) {
    redirect("/login");
  }

  if (hasError) {
    onboardingError("No pudimos guardar tus respuestas. Intenta nuevamente.");
  }

  redirect("/app");
}
