# Fase 3 - Supabase Auth y perfiles

## Objetivo

Implementar autenticacion real con Supabase, proteccion de rutas y tabla `profiles` con RLS.

## Implementado en codigo

- Clientes Supabase para browser, server y middleware
- Middleware para proteger `/app`, `/admin` y `/onboarding`
- Redireccion de usuarios autenticados fuera de `/login` y `/register`
- Login con Server Action
- Registro con Server Action
- Logout con Server Action
- Callback `/auth/callback`
- Dashboard inicial protegido en `/app`
- Placeholder de onboarding en `/onboarding`
- Placeholder admin protegido por rol en `/admin`
- Tipos de perfil

## SQL preparado

Archivo:

```text
sql/001_profiles_auth.sql
```

Incluye:

- Tabla `profiles`
- Roles: `user`, `mentor`, `church_admin`, `admin`, `superadmin`
- Trigger para crear perfil al registrarse
- RLS para leer/editar perfil propio
- Proteccion basica contra escalada de rol
- Acceso admin/superadmin

## Pendiente antes de ejecutar SQL

Confirmar que proyecto Supabase usara Camino. No se aplico ninguna migracion todavia.

## Como probar codigo

```bash
npm run typecheck
npm run build
```

Para probar auth real, crear `.env.local` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Luego ejecutar el SQL aprobado en Supabase.
