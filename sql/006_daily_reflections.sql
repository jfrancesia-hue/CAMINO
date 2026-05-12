-- Fase 10 - Reflexiones diarias
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.daily_reflections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  verse text not null,
  content text not null,
  question text not null,
  action text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create index if not exists daily_reflections_category_idx on public.daily_reflections(category);
create index if not exists daily_reflections_created_at_idx on public.daily_reflections(created_at desc);

alter table public.daily_reflections enable row level security;

drop policy if exists "Authenticated users can read daily reflections" on public.daily_reflections;
create policy "Authenticated users can read daily reflections"
on public.daily_reflections
for select
to authenticated
using (true);

insert into public.daily_reflections (title, verse, content, question, action, category)
select *
from (
  values
    ('Descansar tambien es fe', 'Mateo 11:28', 'Jesus invita a acercarnos cuando estamos cansados. No exige una version perfecta de nosotros.', 'Que carga podes nombrar sin resolverla hoy?', 'Respira 2 minutos y escribi una carga que queres entregar.', 'paz'),
    ('Un paso pequeno', 'Salmo 119:105', 'La luz de Dios muchas veces alcanza para el proximo paso, no para ver todo el mapa.', 'Cual es el proximo paso posible?', 'Elegí una accion pequena y concreta para hoy.', 'proposito'),
    ('Mirarte con ternura', 'Salmo 139:14', 'Tu valor no depende de tu rendimiento ni de tu peor dia.', 'Que frase dura te estas diciendo?', 'Reescribila con mas verdad y compasion.', 'autoestima'),
    ('No caminar solo', 'Galatas 6:2', 'Compartir cargas no es debilidad. Es una forma de amor y comunidad.', 'A quien podrias pedirle compania?', 'Manda un mensaje honesto a alguien confiable.', 'comunidad')
) as seed(title, verse, content, question, action, category)
where not exists (
  select 1 from public.daily_reflections r where r.title = seed.title
);
