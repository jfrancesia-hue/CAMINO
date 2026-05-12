-- Fase 7 - Eventos de crisis
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.crisis_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  message text not null,
  detected_risk text not null,
  action_taken text not null,
  created_at timestamptz not null default now()
);

create index if not exists crisis_events_user_id_idx on public.crisis_events(user_id);
create index if not exists crisis_events_created_at_idx on public.crisis_events(created_at desc);
create index if not exists crisis_events_detected_risk_idx on public.crisis_events(detected_risk);

alter table public.crisis_events enable row level security;

drop policy if exists "Users can insert own crisis events" on public.crisis_events;
create policy "Users can insert own crisis events"
on public.crisis_events
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can read own crisis events" on public.crisis_events;
create policy "Users can read own crisis events"
on public.crisis_events
for select
to authenticated
using (
  user_id = auth.uid()
  or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin')
);
