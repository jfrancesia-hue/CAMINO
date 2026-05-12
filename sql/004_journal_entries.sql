-- Fase 8 - Diario personal
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  emotion text,
  spiritual_topic text,
  created_at timestamptz not null default now()
);

create index if not exists journal_entries_user_id_idx on public.journal_entries(user_id);
create index if not exists journal_entries_emotion_idx on public.journal_entries(emotion);
create index if not exists journal_entries_created_at_idx on public.journal_entries(created_at desc);

alter table public.journal_entries enable row level security;

drop policy if exists "Users manage own journal entries" on public.journal_entries;
create policy "Users manage own journal entries"
on public.journal_entries
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
