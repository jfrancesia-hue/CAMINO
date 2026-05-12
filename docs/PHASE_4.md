# Fase 4 - Onboarding emocional y espiritual

## Objetivo

Crear un onboarding calido que personalice Camino a partir del estado emocional, busqueda espiritual y temas principales del usuario.

## Implementado

- Pantalla `/onboarding`
- Preguntas principales del prompt maestro
- Datos personales basicos: nombre, edad, pais y ciudad
- Estado emocional
- Preferencia de acompanamiento: fe, emocional o ambas
- Seleccion multiple de temas
- Server Action que actualiza `profiles`
- Marca `onboarding_completed` como `true`
- Redirige a `/app`
- Manejo de errores si falta Supabase o la migracion

## Nota de datos

La tabla `profiles` del prompt no incluye una columna especifica para "que estas buscando hoy". Por ahora se conserva junto al estado emocional en `emotional_state` para no ampliar la migracion sin aprobacion adicional.

## Como probar

Con Supabase configurado y `sql/001_profiles_auth.sql` aplicado:

```bash
npm run dev
```

Luego registrarse en `/register` y completar `/onboarding`.
