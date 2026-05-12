-- Fase 6 - Conversaciones y mensajes
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null default 'paz' check (mode in ('paz', 'fe', 'proposito', 'relaciones', 'noche', 'descargo', 'gratitud')),
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  safety_flag text,
  created_at timestamptz not null default now()
);

create index if not exists conversations_user_id_idx on public.conversations(user_id);
create index if not exists conversations_updated_at_idx on public.conversations(updated_at desc);
create index if not exists messages_conversation_id_idx on public.messages(conversation_id);
create index if not exists messages_created_at_idx on public.messages(created_at);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create or replace function public.touch_conversation_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;

  return new;
end;
$$;

drop trigger if exists touch_conversation_updated_at on public.messages;
create trigger touch_conversation_updated_at
  after insert on public.messages
  for each row execute function public.touch_conversation_updated_at();

drop policy if exists "Users manage own conversations" on public.conversations;
create policy "Users manage own conversations"
on public.conversations
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users read own messages" on public.messages;
create policy "Users read own messages"
on public.messages
for select
to authenticated
using (
  exists (
    select 1
    from public.conversations c
    where c.id = messages.conversation_id
      and c.user_id = auth.uid()
  )
);

drop policy if exists "Users insert own messages" on public.messages;
create policy "Users insert own messages"
on public.messages
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.conversations c
    where c.id = messages.conversation_id
      and c.user_id = auth.uid()
  )
);
