-- Fase 3 - Supabase Auth + profiles
-- Revisar y aprobar antes de ejecutar en Supabase.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  age integer check (age is null or age between 13 and 120),
  country text,
  city text,
  faith_status text,
  emotional_state text,
  main_topics text[] default '{}',
  role text not null default 'user' check (role in ('user', 'mentor', 'church_admin', 'admin', 'superadmin')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists profiles_role_idx on public.profiles(role);

alter table public.profiles enable row level security;

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where user_id = auth.uid() limit 1;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (
    new.id,
    nullif(trim(coalesce(new.raw_user_meta_data->>'full_name', '')), '')
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id <> old.user_id then
    raise exception 'user_id cannot be changed';
  end if;

  if new.id <> old.id then
    raise exception 'id cannot be changed';
  end if;

  if new.created_at <> old.created_at then
    raise exception 'created_at cannot be changed';
  end if;

  if new.role <> old.role and coalesce(public.current_user_role(), 'user') not in ('admin', 'superadmin') then
    raise exception 'role cannot be changed by this user';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_privilege_escalation on public.profiles;
create trigger prevent_profile_privilege_escalation
  before update on public.profiles
  for each row execute function public.prevent_profile_privilege_escalation();

drop policy if exists "Profiles are readable by owner and admins" on public.profiles;
create policy "Profiles are readable by owner and admins"
on public.profiles
for select
to authenticated
using (
  user_id = auth.uid()
  or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin')
);

drop policy if exists "Profiles are editable by owner and admins" on public.profiles;
create policy "Profiles are editable by owner and admins"
on public.profiles
for update
to authenticated
using (
  user_id = auth.uid()
  or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin')
)
with check (
  user_id = auth.uid()
  or coalesce(public.current_user_role(), 'user') in ('admin', 'superadmin')
);

drop policy if exists "Profiles can be inserted by service trigger only" on public.profiles;
create policy "Profiles can be inserted by service trigger only"
on public.profiles
for insert
to authenticated
with check (user_id = auth.uid());
