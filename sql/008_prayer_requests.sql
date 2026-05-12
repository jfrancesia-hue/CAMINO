-- Fase 12 - Comunidad basica
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  is_public boolean not null default false,
  status text not null default 'active' check (status in ('active', 'hidden', 'resolved')),
  created_at timestamptz not null default now()
);

create index if not exists prayer_requests_user_id_idx on public.prayer_requests(user_id);
create index if not exists prayer_requests_public_idx on public.prayer_requests(is_public, status);
create index if not exists prayer_requests_created_at_idx on public.prayer_requests(created_at desc);

alter table public.prayer_requests enable row level security;

drop policy if exists "Users can create own prayer requests" on public.prayer_requests;
create policy "Users can create own prayer requests"
on public.prayer_requests
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users read own and public prayer requests" on public.prayer_requests;
create policy "Users read own and public prayer requests"
on public.prayer_requests
for select
to authenticated
using (
  user_id = auth.uid()
  or (is_public = true and status = 'active')
  or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin')
);

drop policy if exists "Users update own prayer requests" on public.prayer_requests;
create policy "Users update own prayer requests"
on public.prayer_requests
for update
to authenticated
using (user_id = auth.uid() or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin'))
with check (user_id = auth.uid() or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin'));
