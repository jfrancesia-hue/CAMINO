# Fase 8 - Diario personal

## Objetivo

Crear `/app/diario` con CRUD real de entradas personales usando Supabase y RLS.

## Implementado

- Tabla `journal_entries` preparada en SQL
- RLS para que cada usuario gestione solo sus entradas
- Crear entrada
- Listar entradas propias
- Filtrar por emocion
- Ver detalle
- Eliminar entrada propia
- Estados vacios y errores si falta Supabase o migracion

## SQL preparado

Archivo:

```text
sql/004_journal_entries.sql
```

## Como probar

Con migraciones aplicadas:

```bash
npm run dev
```

Entrar en `/app/diario`, crear una entrada, abrir el detalle y eliminarla.
