# Environment Variables: clowforge-dashboard

## Required Variables

| Variable | Description | Example | Scope |
|----------|-------------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (ClowPaco) | `https://bfoftsjiqkoqcueagsmq.supabase.co` | client + server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJ...` | client + server |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJ...` | server only |
| `VERCEL_TOKEN` | Vercel API token for deployments | `vercel_...` | server only |
| `NEXT_PUBLIC_SITE_URL` | Dashboard URL | `https://forge.clowpaco.dev` | client + server |

## Optional Variables

| Variable | Description | Example | Scope |
|----------|-------------|---------|-------|
| `VERCEL_TEAM_ID` | Vercel team ID (if not personal) | `team_...` | server only |
| `OPENAI_API_KEY` | For health check ping | `sk-...` | server only |

## Where to Obtain

### Supabase (ClowPaco Project)
The dashboard uses the existing ClowPaco Supabase project where forge_* tables reside.
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select "ClowPaco" project (ref: `bfoftsjiqkoqcueagsmq`)
3. Settings → API
4. Copy Project URL, anon key, service_role key

### Vercel Token
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create new token with:
   - Scope: Full Account (or specific projects)
   - Expiration: No expiration (or set reminder)
3. Copy token → `VERCEL_TOKEN`

### Vercel Team ID
If deploying ClowForge projects under a Vercel team:
1. Team Settings → General
2. Copy "Team ID"

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — use only server-side
- `VERCEL_TOKEN` can deploy to any project — protect carefully
- No variables should have `NEXT_PUBLIC_` prefix except Supabase URL/anon key and site URL

## Production-Only Variables

| Variable | Description | Why Prod-Only |
|----------|-------------|---------------|
| None required | All vars same for preview/production | Uses same Supabase project |

## Vercel Environment Configuration

### Preview Deployments

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bfoftsjiqkoqcueagsmq.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase dashboard) |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase dashboard) |
| `VERCEL_TOKEN` | (from Vercel dashboard) |
| `NEXT_PUBLIC_SITE_URL` | `https://clowforge-dashboard-preview.vercel.app` |

### Production

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://forge.clowpaco.dev` |
| (all others same as preview) | |

## .env.local.example

