# Deploy y produccion

## Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=
```

`SUPABASE_SERVICE_ROLE_KEY` no debe exponerse al cliente. Usarla solo en servidor si una fase futura lo necesita.

## SQL

Aplicar en orden:

1. `sql/001_profiles_auth.sql`
2. `sql/002_conversations_messages.sql`
3. `sql/003_crisis_events.sql`
4. `sql/004_journal_entries.sql`
5. `sql/005_prayers.sql`
6. `sql/006_daily_reflections.sql`
7. `sql/007_guided_paths.sql`
8. `sql/008_prayer_requests.sql`
9. `sql/009_churches_saas.sql`

## Comandos

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Checklist produccion

- [ ] Repo GitHub creado
- [ ] Proyecto Vercel conectado
- [ ] Variables configuradas en Vercel
- [ ] Supabase Auth configurado
- [ ] Redirect URLs configuradas
- [ ] SQL aplicado en orden
- [ ] Registro probado
- [ ] Login probado
- [ ] Onboarding probado
- [ ] Chat IA probado
- [ ] Crisis protocol probado
- [ ] Diario probado
- [ ] Oraciones probadas
- [ ] Reflexiones probadas
- [ ] Caminos probados
- [ ] Comunidad probada
- [ ] Admin probado con rol admin
- [ ] Build production verde
