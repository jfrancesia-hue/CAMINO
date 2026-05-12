"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function pathsError(message: string): never {
  redirect(`/app/caminos?error=${encodeURIComponent(message)}`);
}

export async function startPathAction(formData: FormData) {
  const pathId = String(formData.get("path_id") ?? "");

  if (!pathId) {
    pathsError("Camino invalido.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { error } = await supabase.from("user_path_progress").upsert(
      {
        current_day: 1,
        path_id: pathId,
        user_id: user.id,
      },
      { onConflict: "user_id,path_id" },
    );

    if (error) {
      pathsError("No pudimos iniciar este camino.");
    }
  } catch {
    pathsError("Supabase no esta configurado todavia o falta aplicar la migracion de caminos.");
  }

  revalidatePath("/app/caminos");
  redirect(`/app/caminos/${pathId}`);
}

export async function completePathDayAction(formData: FormData) {
  const pathId = String(formData.get("path_id") ?? "");
  const currentDay = Number(formData.get("current_day") ?? "1");
  const durationDays = Number(formData.get("duration_days") ?? "1");

  if (!pathId || !Number.isInteger(currentDay) || !Number.isInteger(durationDays)) {
    pathsError("Progreso invalido.");
  }

  const nextDay = Math.min(currentDay + 1, durationDays);
  const completed = currentDay >= durationDays;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { error } = await supabase
      .from("user_path_progress")
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        current_day: nextDay,
      })
      .eq("path_id", pathId)
      .eq("user_id", user.id);

    if (error) {
      pathsError("No pudimos actualizar tu progreso.");
    }
  } catch {
    pathsError("No pudimos actualizar tu progreso.");
  }

  revalidatePath("/app/caminos");
  revalidatePath(`/app/caminos/${pathId}`);
  redirect(`/app/caminos/${pathId}`);
}
