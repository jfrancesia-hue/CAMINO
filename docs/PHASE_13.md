# Fase 13 - Admin simple

## Implementado

- `/admin` protegido por rol desde el proxy
- Metricas:
  - usuarios
  - conversaciones
  - entradas de diario
  - crisis detectadas
  - pedidos de oracion
- Lista de eventos de crisis recientes sin mostrar contenido sensible

## Nota de seguridad

La vista usa el cliente Supabase de servidor con la sesion del usuario. No usa service role en frontend ni rompe RLS.

Para ver datos agregados completos, el usuario debe tener rol `admin` o `superadmin`.
