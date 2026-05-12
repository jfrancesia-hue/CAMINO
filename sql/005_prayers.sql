-- Fase 9 - Oraciones guiadas
-- Revisar y aprobar antes de ejecutar en Supabase.

create table if not exists public.prayers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content text not null,
  duration text,
  created_at timestamptz not null default now()
);

create index if not exists prayers_category_idx on public.prayers(category);

alter table public.prayers enable row level security;

drop policy if exists "Authenticated users can read prayers" on public.prayers;
create policy "Authenticated users can read prayers"
on public.prayers
for select
to authenticated
using (true);

insert into public.prayers (title, category, duration, content)
select *
from (
  values
    ('Cuando la ansiedad sube', 'ansiedad', '4 min', 'Senor, estoy inquieto/a y necesito volver a respirar. Ayudame a recibir este momento sin pelearme conmigo. Dame calma para el proximo paso.'),
    ('Antes de dormir', 'noche', '3 min', 'Dios, dejo en tus manos lo que no pude resolver hoy. Que mi cuerpo descanse y mi corazon encuentre quietud.'),
    ('Para agradecer', 'gratitud', '3 min', 'Gracias, Dios, por los regalos pequenos que a veces paso por alto. Abrime los ojos para reconocer tu bondad en lo simple.'),
    ('En una decision', 'decisiones', '5 min', 'Senor, dame sabiduria, paciencia y honestidad para elegir sin miedo. Que no busque controlar todo, sino caminar con verdad.'),
    ('Cuando tengo miedo', 'miedo', '4 min', 'Dios, mi miedo es real, pero no quiero que sea mi unica voz. Acompaname y recordame que no estoy solo/a.'),
    ('Por mi familia', 'familia', '4 min', 'Senor, bendeci a mi familia. Donde haya distancia, trae humildad; donde haya dolor, trae cuidado; donde haya amor, hacelo crecer.'),
    ('Para pedir perdon', 'perdon', '5 min', 'Dios, ayudame a reconocer lo que hice mal sin destruirme por dentro. Dame valor para reparar y recibir misericordia.'),
    ('En la tristeza', 'tristeza', '4 min', 'Senor, hoy me siento triste. No quiero esconderlo. Quedate conmigo en este valle y mostrame una luz pequena.'),
    ('Para encontrar proposito', 'proposito', '5 min', 'Dios, ordena mis deseos y mis talentos. Mostrame como servir, amar y construir algo bueno desde lo que soy.'),
    ('En duelo', 'duelo', '5 min', 'Senor, este dolor pesa. No necesito apurarlo. Acompaname a recordar con amor y a vivir un dia a la vez.'),
    ('Por autoestima', 'autoestima', '4 min', 'Dios, ayudame a mirarme con mas ternura. Que no mida mi valor solo por mis errores, logros o heridas.'),
    ('Al empezar la manana', 'manana', '3 min', 'Senor, te entrego este dia. Que mis palabras, decisiones y silencios sean guiados por amor, paz y verdad.')
) as seed(title, category, duration, content)
where not exists (
  select 1 from public.prayers p where p.title = seed.title
);
