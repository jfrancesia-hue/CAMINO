# Fase 6 - IA Guia Camino

## Objetivo

Crear chat IA en `/app/chat` con modos emocionales/espirituales, guardado de mensajes y deteccion basica de crisis.

## Implementado

- Modos: Paz, Fe, Proposito, Relaciones, Noche, Descargo y Gratitud
- Prompt base etico y cristiano seguro
- Builder de prompt por modo
- Deteccion basica de crisis por patrones
- Respuesta de crisis sin conversacion normal
- Boton "Necesito ayuda ahora"
- API route server-side `/api/chat`
- Uso de `OPENAI_API_KEY` y `OPENAI_MODEL` solo en servidor
- Guardado de conversaciones y mensajes en Supabase
- UI de chat con selector de modo, historial local y estados de carga/error

## SQL preparado

Archivo:

```text
sql/002_conversations_messages.sql
```

Incluye:

- Tabla `conversations`
- Tabla `messages`
- RLS para conversaciones propias
- RLS para mensajes de conversaciones propias
- Trigger para actualizar `updated_at`

## Variables necesarias

```bash
OPENAI_API_KEY=
OPENAI_MODEL=
```

## Pendiente antes de prueba real

- Aplicar `sql/001_profiles_auth.sql`
- Aplicar `sql/002_conversations_messages.sql`
- Configurar Supabase en `.env.local`
- Configurar OpenAI en `.env.local`

## Como probar

Con entorno configurado:

```bash
npm run dev
```

Entrar a `/app/chat`, elegir modo y enviar un mensaje.
