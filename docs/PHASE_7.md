# Fase 7 - Deteccion de crisis

## Objetivo

Detectar mensajes de riesgo, evitar respuesta normal de IA, mostrar protocolo de ayuda y guardar el evento.

## Implementado

- Deteccion basica de:
  - suicidio
  - autolesion
  - abuso
  - violencia
  - desesperacion extrema
  - ataques de panico
  - peligro inmediato
- Respuesta de crisis fija y cuidadosa
- Boton "Necesito ayuda ahora"
- Registro en `crisis_events` desde `/api/chat`
- SQL con RLS para eventos propios y lectura admin/superadmin

## SQL preparado

Archivo:

```text
sql/003_crisis_events.sql
```

## Pendiente antes de prueba real

Aplicar las migraciones SQL 001, 002 y 003 en orden sobre el proyecto Supabase confirmado.

## Como probar

Con Supabase y OpenAI configurados:

```bash
npm run dev
```

Enviar un mensaje de riesgo en `/app/chat`. La app debe mostrar la respuesta de crisis y el boton de ayuda.
