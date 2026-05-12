-- Fase 14 - Preparacion SaaS iglesias
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.churches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  country text,
  contact_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.church_members (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('member', 'mentor', 'church_admin')),
  created_at timestamptz not null default now(),
  unique(church_id, user_id)
);

create table if not exists public.church_content (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  title text not null,
  content text not null,
  type text not null check (type in ('reflection', 'prayer', 'announcement', 'resource')),
  created_at timestamptz not null default now()
);

create table if not exists public.church_events (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  created_at timestamptz not null default now()
);

create index if not exists church_members_user_id_idx on public.church_members(user_id);
create index if not exists church_members_church_id_idx on public.church_members(church_id);
create index if not exists church_content_church_id_idx on public.church_content(church_id);
create index if not exists church_events_church_id_idx on public.church_events(church_id);
create index if not exists church_events_event_date_idx on public.church_events(event_date);

alter table public.churches enable row level security;
alter table public.church_members enable row level security;
alter table public.church_content enable row level security;
alter table public.church_events enable row level security;

create or replace function public.is_church_member(target_church_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.church_members cm
    where cm.church_id = target_church_id
      and cm.user_id = auth.uid()
  );
$$;

create or replace function public.is_church_admin(target_church_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.church_members cm
    where cm.church_id = target_church_id
      and cm.user_id = auth.uid()
      and cm.role in ('church_admin', 'mentor')
  ) or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin');
$$;

drop policy if exists "Admins can manage churches" on public.churches;
create policy "Admins can manage churches"
on public.churches
for all
to authenticated
using (coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin'))
with check (coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin'));

drop policy if exists "Members can read own church memberships" on public.church_members;
create policy "Members can read own church memberships"
on public.church_members
for select
to authenticated
using (user_id = auth.uid() or public.is_church_admin(church_id));

drop policy if exists "Church admins manage memberships" on public.church_members;
create policy "Church admins manage memberships"
on public.church_members
for all
to authenticated
using (public.is_church_admin(church_id))
with check (public.is_church_admin(church_id));

drop policy if exists "Members read church content" on public.church_content;
create policy "Members read church content"
on public.church_content
for select
to authenticated
using (public.is_church_member(church_id) or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin'));

drop policy if exists "Church admins manage content" on public.church_content;
create policy "Church admins manage content"
on public.church_content
for all
to authenticated
using (public.is_church_admin(church_id))
with check (public.is_church_admin(church_id));

drop policy if exists "Members read church events" on public.church_events;
create policy "Members read church events"
on public.church_events
for select
to authenticated
using (public.is_church_member(church_id) or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin'));

drop policy if exists "Church admins manage events" on public.church_events;
create policy "Church admins manage events"
on public.church_events
for all
to authenticated
using (public.is_church_admin(church_id))
with check (public.is_church_admin(church_id));
