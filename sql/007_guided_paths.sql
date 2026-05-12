-- Fase 11 - Caminos guiados
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.guided_paths (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  description text not null,
  duration_days integer not null check (duration_days > 0),
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.guided_path_days (
  id uuid primary key default gen_random_uuid(),
  path_id uuid not null references public.guided_paths(id) on delete cascade,
  day_number integer not null check (day_number > 0),
  title text not null,
  content text not null,
  prayer text,
  exercise text,
  verse text,
  created_at timestamptz not null default now(),
  unique(path_id, day_number)
);

create table if not exists public.user_path_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id uuid not null references public.guided_paths(id) on delete cascade,
  current_day integer not null default 1 check (current_day > 0),
  completed boolean not null default false,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(user_id, path_id)
);

create index if not exists guided_paths_category_idx on public.guided_paths(category);
create index if not exists guided_path_days_path_id_idx on public.guided_path_days(path_id);
create index if not exists user_path_progress_user_id_idx on public.user_path_progress(user_id);

alter table public.guided_paths enable row level security;
alter table public.guided_path_days enable row level security;
alter table public.user_path_progress enable row level security;

drop policy if exists "Authenticated users can read guided paths" on public.guided_paths;
create policy "Authenticated users can read guided paths"
on public.guided_paths for select to authenticated using (true);

drop policy if exists "Authenticated users can read guided path days" on public.guided_path_days;
create policy "Authenticated users can read guided path days"
on public.guided_path_days for select to authenticated using (true);

drop policy if exists "Users manage own path progress" on public.user_path_progress;
create policy "Users manage own path progress"
on public.user_path_progress
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

insert into public.guided_paths (title, description, duration_days, category)
select *
from (
  values
    ('7 dias para volver a encontrar paz', 'Un camino breve para bajar el ruido interior y practicar descanso.', 7, 'paz'),
    ('7 dias para vencer la ansiedad', 'Ejercicios simples de respiracion, verdad y oracion para momentos ansiosos.', 7, 'ansiedad'),
    ('14 dias de autoestima y fe', 'Una mirada mas compasiva sobre tu valor, tu historia y tu identidad.', 14, 'autoestima'),
    ('21 dias de proposito', 'Preguntas y pasos para descubrir sentido en lo cotidiano.', 21, 'proposito'),
    ('Camino del perdon', 'Un proceso cuidadoso para mirar heridas, limites y misericordia.', 7, 'perdon'),
    ('Camino para volver a orar', 'Una guia amable para reconectar con Dios sin presion.', 7, 'fe')
) as seed(title, description, duration_days, category)
where not exists (
  select 1 from public.guided_paths p where p.title = seed.title
);

insert into public.guided_path_days (path_id, day_number, title, content, prayer, exercise, verse)
select p.id, day.day_number, day.title, day.content, day.prayer, day.exercise, day.verse
from public.guided_paths p
cross join lateral (
  values
    (1, 'Nombrar donde estas', 'Empeza sin exigirte estar bien. Nombrar lo que pasa ya es un primer acto de verdad.', 'Dios, ayudame a mirarme con honestidad y ternura.', 'Escribi tres palabras que describan tu dia.', 'Salmo 46:10'),
    (2, 'Respirar antes de resolver', 'No todo se arregla hoy. Tu cuerpo tambien necesita escuchar que esta a salvo.', 'Senor, dame calma para este momento.', 'Respira 4-4-6 durante tres ciclos.', 'Mateo 11:28'),
    (3, 'Un paso pequeno', 'Caminar no siempre significa avanzar rapido. A veces es permanecer con esperanza.', 'Dios, mostrame el paso posible.', 'Elegí una accion pequena para las proximas 24 horas.', 'Salmo 119:105')
) as day(day_number, title, content, prayer, exercise, verse)
where not exists (
  select 1
  from public.guided_path_days d
  where d.path_id = p.id and d.day_number = day.day_number
);
