import { AppShell, Badge, Card, PageHeader } from "@/components";
import { getCurrentProfile } from "@/lib/supabase/profile";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  return (
    <AppShell>
      <PageHeader
        description="Tus datos de personalizacion para que Camino pueda acompanarte mejor."
        eyebrow="Perfil"
        title="Tu perfil"
      />
      <Card className="mt-10">
        <Badge tone="sky">Datos</Badge>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <ProfileItem label="Nombre" value={profile?.full_name} />
          <ProfileItem label="Pais" value={profile?.country} />
          <ProfileItem label="Ciudad" value={profile?.city} />
          <ProfileItem label="Estado emocional" value={profile?.emotional_state} />
        </dl>
      </Card>
    </AppShell>
  );
}

function ProfileItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-white/48">{label}</dt>
      <dd className="mt-1 text-white/85">{value || "Pendiente"}</dd>
    </div>
  );
}
