# Camino

Camino es una plataforma de acompanamiento espiritual y emocional con IA para personas que buscan paz, proposito y reconexion con la fe cristiana.

> Camino no reemplaza atencion medica, psicologica, pastoral ni emergencias. Es una herramienta de acompanamiento espiritual y emocional.

## Estado actual

Las fases 1 a 15 estan completadas localmente en codigo, SQL revisable y documentacion.

No se aplico ninguna migracion remota. Para produccion hay que confirmar Supabase, ejecutar SQL en orden, configurar variables y probar flujos reales.

## Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Supabase Auth y PostgreSQL
- OpenAI API
- Vercel ready

## Estructura

- `app`: rutas y layout global de Next.js
- `components`: UI compartida
- `lib/supabase`: configuracion y clientes Supabase
- `lib/ai`: prompts y helpers IA
- `lib/safety`: disclaimers y seguridad
- `types`: tipos compartidos
- `sql`: migraciones y semillas por fase
- `docs`: documentacion de producto y etica

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Variables de entorno

Crear `.env.local` a partir de `.env.example` cuando se implemente autenticacion, base de datos e IA.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

## Fase 1 - Checklist

- [x] Revisar el proyecto actual
- [x] Crear base Next.js con TypeScript
- [x] Configurar Tailwind
- [x] Crear estructura de carpetas
- [x] Crear layout global
- [x] Crear tema visual base
- [x] Crear componentes UI base
- [x] Crear README inicial
- [x] Verificar que corre sin errores

## Siguientes fases

La Fase 2 construira la landing publica premium. Las fases de Supabase, autenticacion, RLS e IA se haran despues de revisar el estado de base de datos y con cambios incrementales.

## Direccion de producto

Antes de ampliar modulos, Camino prioriza identidad, foco emocional y MVP real. Ver:

- `docs/BRAND.md`
- `docs/AI_BEHAVIOR.md`
- `docs/PRODUCT.md`
- `docs/ETHICS.md`
- `docs/ROADMAP.md`
- `docs/DEPLOYMENT.md`
- `docs/MVP.md`
- `docs/PHASE_2.md`
- `docs/PHASE_3.md`
- `docs/PHASE_4.md`
- `docs/PHASE_5.md`
- `docs/PHASE_6.md`
- `docs/PHASE_7.md`
- `docs/PHASE_8.md`
- `docs/PHASE_9.md`
- `docs/PHASE_10.md`
- `docs/PHASE_11.md`
- `docs/PHASE_12.md`
- `docs/PHASE_13.md`
- `docs/PHASE_14.md`
- `docs/PHASE_15.md`
