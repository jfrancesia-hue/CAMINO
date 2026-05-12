"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function journalError(message: string): never {
  redirect(`/app/diario?error=${encodeURIComponent(message)}`);
}

export async function createJournalEntryAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const emotion = String(formData.get("emotion") ?? "").trim();
  const spiritualTopic = String(formData.get("spiritual_topic") ?? "").trim();

  if (!title || !content) {
    journalError("Escribi un titulo y una entrada para guardar.");
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
      const { error } = await supabase.from("journal_entries").insert({
        content,
        emotion: emotion || null,
        spiritual_topic: spiritualTopic || null,
        title,
        user_id: user.id,
      });
      hasError = Boolean(error);
    }
  } catch {
    journalError("Supabase no esta configurado todavia o falta aplicar la migracion del diario.");
  }

  if (needsLogin) {
    redirect("/login");
  }

  if (hasError) {
    journalError("No pudimos guardar la entrada.");
  }

  revalidatePath("/app/diario");
  redirect("/app/diario");
}

export async function deleteJournalEntryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    journalError("Entrada invalida.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    await supabase.from("journal_entries").delete().eq("id", id);
  } catch {
    journalError("No pudimos eliminar la entrada.");
  }

  revalidatePath("/app/diario");
  redirect("/app/diario");
}
