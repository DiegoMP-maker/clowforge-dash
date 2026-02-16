[35m[plugins][39m [36mmemory-lancedb: plugin registered (db: /home/paco/.openclaw/memory/lancedb, lazy init)[39m
<!-- FILE: architecture.md -->
```markdown
# Architecture: clowforge-dashboard

## Overview

ClowForge Dashboard is an internal operations dashboard for monitoring and managing the ClowForge multi-agent web development pipeline. It connects to existing Supabase tables (`forge_projects`, `forge_runs`, `forge_tasks`) to provide real-time visibility into project status, pipeline execution, deployment URLs, and cost tracking. This is a private tool for the development team—no public marketing pages.

## Tech Stack

| Dependency | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| Next.js | 15.x | Framework | App Router for SSR dashboard pages with real-time updates |
| React | 19.x | UI Library | Bundled with Next.js 15 |
| TypeScript | 5.x | Language | Strict mode for type safety |
| Tailwind CSS | 4.x | Styling | Utility-first for data-dense layouts |
| @supabase/ssr | 0.5.x | Auth/DB Client | Server-side Supabase with cookie-based sessions |
| @tanstack/react-query | 5.x | Data Fetching | Polling, caching, background refetch for live data |
| Recharts | 2.x | Charts | Cost trends, task timing visualization |
| date-fns | 3.x | Date Utilities | Relative times, duration formatting |
| Zod | 3.x | Validation | API input validation |
| Lucide React | 0.400+ | Icons | Consistent icon system |
| clsx + tailwind-merge | latest | Class Utils | Conditional classes |

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    VERCEL EDGE                                           │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                              Next.js Middleware                                    │  │
│  │   • Validate Supabase session cookie                                              │  │
│  │   • Redirect unauthenticated to /login                                            │  │
│  │   • All routes except /login, /api/auth/* require auth                            │  │
│  └───────────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
          ┌────────────────────────────────┼────────────────────────────────┐
          │                                │                                │
          ▼                                ▼                                ▼
┌───────────────────────┐    ┌───────────────────────────┐    ┌───────────────────────┐
│   AUTH PAGES          │    │      API ROUTES           │    │   DASHBOARD (SSR)     │
│                       │    │                           │    │                       │
│  /login               │    │  POST /api/auth/callback  │    │  / (projects list)    │
│                       │    │  GET  /api/projects       │    │  /projects/[id]       │
│  Email/password only  │    │  GET  /api/runs           │    │  /runs                │
│  No OAuth             │    │  GET  /api/runs/[id]      │    │  /runs/[id]           │
│  No signup (invite)   │    │  POST /api/deploy         │    │  /costs               │
│                       │    │  GET  /api/costs          │    │  /health              │
│                       │    │  GET  /api/health         │    │  /settings            │
└───────────────────────┘    └───────────────────────────┘    └───────────────────────┘
                                           │
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              SUPABASE (ClowPaco Project)                                 │
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                         EXISTING TABLES (read-only)                                │ │
│  │                                                                                    │ │
│  │  forge_projects          forge_runs              forge_tasks                       │ │
│  │  ├─ id                   ├─ id                   ├─ id                            │ │
│  │  ├─ name                 ├─ project_id (FK)      ├─ run_id (FK)                   │ │
│  │  ├─ description          ├─ status               ├─ agent                         │ │
│  │  ├─ status               ├─ started_at           ├─ phase                         │ │
│  │  ├─ preview_url          ├─ completed_at         ├─ status                        │ │
│  │  ├─ production_url       ├─ error_message        ├─ started_at                    │ │
│  │  ├─ repository_url       ├─ artifacts            ├─ completed_at                  │ │
│  │  ├─ branch               ├─ cost_usd             ├─ duration_ms                   │ │
│  │  ├─ created_at           ├─ created_at           ├─ input_tokens                  │ │
│  │  └─ updated_at           └─ updated_at           ├─ output_tokens                 │ │
│  │                                                   ├─ cost_usd                      │ │
│  │                                                   └─ created_at                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                         NEW TABLES (dashboard-specific)                            │ │
│  │                                                                                    │ │
│  │  dashboard_users                    dashboard_settings                             │ │
│  │  ├─ id (FK auth.users)              ├─ key                                        │ │
│  │  ├─ email                           ├─ value (JSONB)                              │ │
│  │  ├─ full_name                       └─ updated_at                                 │ │
│  │  ├─ role (admin|viewer)                                                           │ │
│  │  └─ created_at                                                                     │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  ┌──────────────────┐                                                                   │
│  │    Realtime      │ ◄─── Subscribe to forge_runs and forge_tasks changes             │
│  │    Channels      │      for live build progress updates                              │
│  └──────────────────┘                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

### ADR-001: Read-Only Access to Existing ClowForge Tables
**Context:** The `forge_projects`, `forge_runs`, and `forge_tasks` tables already exist in the ClowPaco Supabase project. The dashboard must not modify the pipeline's core data.
**Decision:** Dashboard queries these tables read-only via Supabase client. No migrations for these tables. Write operations (like triggering deploys) go through API routes that call external services.
**Consequences:** Clean separation of concerns. Dashboard cannot corrupt pipeline state. Requires careful RLS to allow dashboard users to SELECT.

### ADR-002: Invite-Only Authentication
**Context:** This is an internal tool. No self-registration needed.
**Decision:** No `/signup` page. Admin creates users via Supabase dashboard or CLI. Login is email/password only—no OAuth complexity for internal tool.
**Consequences:** Simpler auth flow. User onboarding is manual (acceptable for small team).

### ADR-003: Real-Time Build Status via Supabase Realtime
**Context:** Users need live updates during pipeline runs without manual refresh.
**Decision:** Subscribe to `forge_runs` and `forge_tasks` tables via Supabase Realtime. Update UI optimistically as tasks complete.
**Consequences:** Live progress bars and status changes. Slightly increased Supabase usage (realtime connections), but acceptable for internal dashboard.

### ADR-004: Cost Aggregation via SQL Views
**Context:** Need to display costs per project, per run, and monthly totals.
**Decision:** Create PostgreSQL views (`v_project_costs`, `v_monthly_costs`) that aggregate from `forge_runs` and `forge_tasks`. Query views instead of computing in application code.
**Consequences:** Efficient server-side aggregation. Views must be maintained if schema changes.

### ADR-005: Server Components for Dashboard Pages
**Context:** Dashboard is data-heavy. Need fast initial load with fresh data.
**Decision:** Use Next.js Server Components for all dashboard pages. Fetch data server-side. Use React Query only for client-side polling/refetch.
**Consequences:** Fast initial render. SEO not relevant (internal tool). Slightly more complex hydration for real-time features.

### ADR-006: Deploy Actions via API Routes
**Context:** Dashboard needs to trigger Vercel deploys and rollbacks.
**Decision:** API routes (`/api/deploy/preview`, `/api/deploy/production`, `/api/deploy/rollback`) call Vercel API with stored deploy hooks. Requires `VERCEL_TOKEN` in environment.
**Consequences:** Clean abstraction. Deploy logic centralized. Requires Vercel API access.

## Authentication Flow

### Login (Email/Password)
1. User navigates to `/login`
2. Enters email and password
3. Client calls `supabase.auth.signInWithPassword()`
4. Supabase validates credentials
5. Session stored in httpOnly cookie via `@supabase/ssr`
6. Middleware validates session on subsequent requests
7. Redirect to `/` (projects dashboard)

### Session Management
- Sessions stored in httpOnly, secure, SameSite=Lax cookies
- Access token TTL: 1 hour (auto-refreshed)
- Refresh token TTL: 7 days
- Middleware checks session on every request to protected routes
- Invalid/expired session → redirect to `/login`

### Logout
1. User clicks logout in header
2. Client calls `supabase.auth.signOut()`
3. Cookie cleared
4. Redirect to `/login`

### User Provisioning
- No self-signup
- Admin creates user in Supabase Auth dashboard
- On first login, trigger creates `dashboard_users` profile
- Role (admin/viewer) set manually in database

### Route Protection
```
Protected (require auth):
  / (projects list)
  /projects/*
  /runs/*
  /costs
  /health
  /settings
  /api/* (except /api/auth/callback)

Public:
  /login
  /api/auth/callback
```

## Data Flow Patterns

### Projects List (Initial Load)
```
/page.tsx (Server Component)
        │
        ▼
supabase.from('forge_projects')
  .select('*, forge_runs(count)')
  .order('updated_at', { ascending: false })
        │
        ▼
Render projects table with status badges
        │
        ▼
Client hydrates with React Query for polling (30s)
```

### Run Detail with Real-Time Tasks
```
/runs/[id]/page.tsx (Server Component)
        │
        ▼
Fetch run + tasks server-side
        │
        ▼
Render initial state
        │
        ▼
Client subscribes to realtime:
  supabase.channel('run-tasks')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'forge_tasks',
      filter: `run_id=eq.${runId}`
    })
        │
        ▼
Update UI as tasks complete
```

### Cost Dashboard
```
/costs/page.tsx (Server Component)
        │
        ▼
Query v_monthly_costs view (aggregated)
Query v_project_costs view (per-project)
        │
        ▼
Render charts (Recharts) + data tables
        │
        ▼
Date range picker triggers client-side re-query
```

### Caching Strategy
- **Server Components:** No cache (always fresh for dashboard)
- **React Query staleTime:** 30 seconds for project/run lists
- **Realtime:** Instant updates bypass cache
- **Cost aggregations:** Cache 5 minutes (less volatile)

## Error Handling Strategy

### Global Error Boundary
- `app/error.tsx` catches unhandled errors
- Shows error message with "Go back" and "Retry" buttons
- Logs errors to console (extend to logging service if needed)

### API Error Response Format
```json
{
  "data": null,
  "error": {
    "code": "NOT_FOUND",
    "message": "Run abc123 not found",
    "details": {}
  }
}
```

### Toast Notifications
- **Success:** Green, auto-dismiss 3s (deploy triggered, settings saved)
- **Error:** Red, manual dismiss (deploy failed, API error)
- **Info:** Blue, auto-dismiss 5s (new run started via realtime)

### Retry Policies
- React Query: 2 retries for GET, 0 for mutations
- Realtime: Auto-reconnect with exponential backoff
- Deploy actions: No auto-retry (manual retry via UI)

## Deployment Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   GitHub    │────▶│   Vercel    │────▶│   Deploy    │
│   Push      │     │   Build     │     │   Preview   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                    ┌─────────┴─────────┐
                                    │                   │
                                    ▼                   ▼
                            ┌─────────────┐     ┌─────────────┐
                            │  PR Review  │     │   Merge     │
                            │  (Preview)  │     │   to main   │
                            └─────────────┘     └─────────────┘
                                                      │
                                                      ▼
                                              ┌─────────────┐
                                              │ Production  │
                                              └─────────────┘
```

### Environment Strategy
- **Preview:** Same Supabase project (ClowPaco), read-only access
- **Production:** Same Supabase project, read-only access
- No separate staging database needed (internal tool)

## Security Considerations

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://*.supabase.co;
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.vercel.com;
font-src 'self';
frame-ancestors 'none';
```

### Rate Limiting
- Rely on Vercel's default rate limiting
- Internal tool with few users—not a concern
- Deploy endpoints: 10 requests per minute (prevent accidental spam)

### Input Validation
- Zod schemas for all API inputs
- UUIDs validated before database queries
- No user-generated content stored (read-only dashboard)

### Access Control
- All forge_* tables: SELECT only (RLS policies)
- Dashboard users: authenticated users only
- Admin vs viewer roles: enforced in application layer for deploy actions

### Additional Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
```

<!-- FILE: schema.sql -->
```sql
-- schema.sql
-- Generated by Architect agent for clowforge-dashboard
-- 
-- IMPORTANT: This file contains ONLY dashboard-specific tables.
-- The forge_projects, forge_runs, and forge_tasks tables already exist
-- and must NOT be modified by this migration.

-- ============================================================
-- EXTENSIONS
-- ============================================================
-- Already enabled in ClowPaco project, but safe to re-run
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TYPES
-- ============================================================
CREATE TYPE dashboard_role AS ENUM ('admin', 'viewer');

-- ============================================================
-- FUNCTIONS
-- ============================================================
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create dashboard user profile on auth signup
CREATE OR REPLACE FUNCTION handle_dashboard_user_created()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.dashboard_users (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'viewer'  -- Default role, admin must upgrade manually
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- TABLES (Dashboard-specific only)
-- ============================================================

-- Dashboard users (extends auth.users for dashboard-specific data)
CREATE TABLE IF NOT EXISTS dashboard_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role dashboard_role DEFAULT 'viewer' NOT NULL,
    
    -- Preferences
    theme VARCHAR(10) DEFAULT 'system',  -- 'light', 'dark', 'system'
    notifications_enabled BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_dashboard_users_email ON dashboard_users (email);

-- Dashboard settings (key-value store for global settings)
CREATE TABLE IF NOT EXISTS dashboard_settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Deployment logs (track manual deploys triggered via dashboard)
CREATE TABLE IF NOT EXISTS deployment_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    project_id UUID NOT NULL,  -- References forge_projects(id) but no FK to avoid tight coupling
    run_id UUID,               -- Optional, references forge_runs(id)
    
    triggered_by UUID NOT NULL REFERENCES dashboard_users(id) ON DELETE SET NULL,
    
    action VARCHAR(20) NOT NULL,  -- 'deploy_preview', 'deploy_production', 'rollback'
    target_url TEXT,
    
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,  -- 'pending', 'success', 'failed'
    vercel_deployment_id VARCHAR(100),
    error_message TEXT,
    
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_deployment_logs_project ON deployment_logs (project_id);
CREATE INDEX IF NOT EXISTS idx_deployment_logs_created ON deployment_logs (created_at DESC);

-- ============================================================
-- VIEWS (Cost aggregations from existing forge_* tables)
-- ============================================================

-- Monthly cost summary
CREATE OR REPLACE VIEW v_monthly_costs AS
SELECT
    date_trunc('month', r.created_at) AS month,
    COUNT(DISTINCT r.project_id) AS projects_count,
    COUNT(r.id) AS runs_count,
    COALESCE(SUM(r.cost_usd), 0) AS total_cost_usd,
    COALESCE(SUM(t.input_tokens), 0) AS total_input_tokens,
    COALESCE(SUM(t.output_tokens), 0) AS total_output_tokens
FROM forge_runs r
LEFT JOIN forge_tasks t ON t.run_id = r.id
GROUP BY date_trunc('month', r.created_at)
ORDER BY month DESC;

-- Per-project cost summary
CREATE OR REPLACE VIEW v_project_costs AS
SELECT
    p.id AS project_id,
    p.name AS project_name,
    COUNT(r.id) AS runs_count,
    COALESCE(SUM(r.cost_usd), 0) AS total_cost_usd,
    MAX(r.created_at) AS last_run_at
FROM forge_projects p
LEFT JOIN forge_runs r ON r.project_id = p.id
GROUP BY p.id, p.name
ORDER BY total_cost_usd DESC;

-- Run details with task aggregation
CREATE OR REPLACE VIEW v_run_details AS
SELECT
    r.id AS run_id,
    r.project_id,
    p.name AS project_name,
    r.status,
    r.started_at,
    r.completed_at,
    EXTRACT(EPOCH FROM (r.completed_at - r.started_at)) * 1000 AS duration_ms,
    r.cost_usd,
    r.error_message,
    COUNT(t.id) AS tasks_count,
    COUNT(t.id) FILTER (WHERE t.status = 'completed') AS tasks_completed,
    COUNT(t.id) FILTER (WHERE t.status = 'failed') AS tasks_failed,
    array_agg(DISTINCT t.agent) FILTER (WHERE t.agent IS NOT NULL) AS agents_used
FROM forge_runs r
JOIN forge_projects p ON p.id = r.project_id
LEFT JOIN forge_tasks t ON t.run_id = r.id
GROUP BY r.id, r.project_id, p.name, r.status, r.started_at, r.completed_at, r.cost_usd, r.error_message
ORDER BY r.created_at DESC;

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Updated_at triggers for dashboard tables
CREATE TRIGGER update_dashboard_users_updated_at
    BEFORE UPDATE ON dashboard_users FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_settings_updated_at
    BEFORE UPDATE ON dashboard_settings FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-create dashboard user on auth signup
-- Drop first in case it exists
DROP TRIGGER IF EXISTS on_auth_user_created_dashboard ON auth.users;
CREATE TRIGGER on_auth_user_created_dashboard
    AFTER INSERT ON auth.users FOR EACH ROW
    EXECUTE FUNCTION handle_dashboard_user_created();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Dashboard users: users can read all (small team), update own
ALTER TABLE dashboard_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all dashboard users"
    ON dashboard_users FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile"
    ON dashboard_users FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Dashboard settings: all authenticated can read, admin can write
ALTER TABLE dashboard_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read settings"
    ON dashboard_settings FOR SELECT
    USING (auth.role() = 'authenticated');

-- REQUIRES: service_role (admin operations via API)
CREATE POLICY "Service role manages settings"
    ON dashboard_settings FOR ALL
    USING (auth.role() = 'service_role');

-- Deployment logs: all authenticated can read, insert requires auth
ALTER TABLE deployment_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view deployment logs"
    ON deployment_logs FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create deployment logs"
    ON deployment_logs FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- REQUIRES: service_role (for status updates from webhooks)
CREATE POLICY "Service role updates deployment logs"
    ON deployment_logs FOR UPDATE
    USING (auth.role() = 'service_role');

-- ============================================================
-- RLS POLICIES FOR EXISTING FORGE_* TABLES
-- ============================================================
-- These tables already have RLS. Adding SELECT policies for dashboard users.
-- Run these manually if dashboard users can't query forge_* tables.

-- NOTE: Only add these if forge_* tables don't already have open SELECT policies
/*
CREATE POLICY "Dashboard users can read forge_projects"
    ON forge_projects FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Dashboard users can read forge_runs"
    ON forge_runs FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Dashboard users can read forge_tasks"
    ON forge_tasks FOR SELECT
    USING (auth.role() = 'authenticated');
*/

-- ============================================================
-- SEED DATA
-- ============================================================

-- Default settings
INSERT INTO dashboard_settings (key, value) VALUES
    ('cost_alert_threshold_usd', '10'),
    ('default_poll_interval_ms', '30000'),
    ('realtime_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
```

<!-- FILE: file_tree.txt -->
```
clowforge-dashboard/
├── .env.local.example              # Environment variables template
├── .eslintrc.cjs                   # ESLint config with Next.js rules
├── .prettierrc                     # Prettier formatting rules
├── .gitignore                      # Git ignore patterns
├── tsconfig.json                   # TypeScript strict mode config
├── tailwind.config.ts              # Tailwind 4 config with dashboard theme
├── next.config.ts                  # Next.js config (headers, redirects)
├── package.json                    # Dependencies and scripts
├── pnpm-lock.yaml                  # Lockfile
├── README.md                       # Project documentation
├── public/
│   ├── favicon.ico                 # ClowForge favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── logo.svg                    # ClowForge logo
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, providers)
│   │   ├── page.tsx                # Projects dashboard (main page)
│   │   ├── not-found.tsx           # 404 page
│   │   ├── error.tsx               # Global error boundary
│   │   ├── loading.tsx             # Global loading skeleton
│   │   ├── globals.css             # Tailwind imports + CSS variables
│   │   ├── (auth)/                 # Auth pages (minimal layout)
│   │   │   ├── layout.tsx          # Centered auth layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx        # Login page (email/password)
│   │   │   └── callback/
│   │   │       └── route.ts        # Auth callback handler
│   │   ├── (dashboard)/            # Main dashboard (authenticated)
│   │   │   ├── layout.tsx          # Dashboard layout (sidebar + header)
│   │   │   ├── projects/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx    # Project detail (runs, deploys)
│   │   │   │       └── loading.tsx # Project loading skeleton
│   │   │   ├── runs/
│   │   │   │   ├── page.tsx        # All runs list
│   │   │   │   ├── loading.tsx     # Runs loading skeleton
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx    # Run detail (tasks, timeline)
│   │   │   │       └── loading.tsx # Run detail skeleton
│   │   │   ├── costs/
│   │   │   │   ├── page.tsx        # Cost dashboard
│   │   │   │   └── loading.tsx     # Costs loading skeleton
│   │   │   ├── health/
│   │   │   │   └── page.tsx        # System health overview
│   │   │   └── settings/
│   │   │       └── page.tsx        # Dashboard settings
│   │   └── api/
│   │       ├── auth/
│   │       │   └── callback/
│   │       │       └── route.ts    # Supabase auth callback
│   │       ├── projects/
│   │       │   ├── route.ts        # GET: List projects
│   │       │   └── [id]/
│   │       │       └── route.ts    # GET: Project detail
│   │       ├── runs/
│   │       │   ├── route.ts        # GET: List runs with filters
│   │       │   └── [id]/
│   │       │       ├── route.ts    # GET: Run detail with tasks
│   │       │       └── tasks/
│   │       │           └── route.ts # GET: Tasks for run
│   │       ├── deploy/
│   │       │   ├── preview/
│   │       │   │   └── route.ts    # POST: Trigger preview deploy
│   │       │   ├── production/
│   │       │   │   └── route.ts    # POST: Trigger production deploy
│   │       │   └── rollback/
│   │       │       └── route.ts    # POST: Rollback deployment
│   │       ├── costs/
│   │       │   ├── route.ts        # GET: Cost summary
│   │       │   └── monthly/
│   │       │       └── route.ts    # GET: Monthly breakdown
│   │       └── health/
│   │           └── route.ts        # GET: System health check
│   ├── components/
│   │   ├── ui/                     # Primitive UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── dialog.tsx
│   │   ├── layout/                 # Layout components
│   │   │   ├── sidebar.tsx         # Dashboard sidebar navigation
│   │   │   ├── header.tsx          # Dashboard header with user menu
│   │   │   ├── user-menu.tsx       # User dropdown (logout, settings)
│   │   │   └── breadcrumbs.tsx     # Page breadcrumbs
│   │   ├── projects/               # Project-related components
│   │   │   ├── project-card.tsx    # Project card for grid
│   │   │   ├── project-table.tsx   # Projects data table
│   │   │   ├── project-status.tsx  # Status badge component
│   │   │   ├── deploy-urls.tsx     # Preview/production URL display
│   │   │   └── deploy-actions.tsx  # Deploy/rollback buttons
│   │   ├── runs/                   # Run-related components
│   │   │   ├── run-card.tsx        # Run summary card
│   │   │   ├── run-table.tsx       # Runs data table
│   │   │   ├── run-status.tsx      # Run status badge
│   │   │   ├── run-timeline.tsx    # Visual task timeline
│   │   │   └── run-filters.tsx     # Status/date filters
│   │   ├── tasks/                  # Task-related components
│   │   │   ├── task-list.tsx       # Task list for run
│   │   │   ├── task-item.tsx       # Single task row
│   │   │   ├── task-status.tsx     # Task status badge
│   │   │   └── task-details.tsx    # Expandable task details
│   │   ├── costs/                  # Cost-related components
│   │   │   ├── cost-summary.tsx    # Monthly cost overview cards
│   │   │   ├── cost-chart.tsx      # Monthly cost trend chart
│   │   │   ├── cost-by-project.tsx # Cost per project table
│   │   │   ├── cost-by-agent.tsx   # Cost breakdown by agent
│   │   │   └── date-range-picker.tsx # Date range filter
│   │   ├── health/                 # Health-related components
│   │   │   ├── health-card.tsx     # Health metric card
│   │   │   ├── health-grid.tsx     # Health overview grid
│   │   │   └── service-status.tsx  # External service status
│   │   ├── auth/                   # Auth components
│   │   │   └── login-form.tsx      # Email/password login form
│   │   └── shared/                 # Shared components
│   │       ├── logo.tsx            # ClowForge logo
│   │       ├── empty-state.tsx     # Empty state placeholder
│   │       ├── relative-time.tsx   # "2 hours ago" display
│   │       ├── duration.tsx        # "3m 24s" duration display
│   │       ├── cost-display.tsx    # "$0.45" formatted cost
│   │       └── copy-button.tsx     # Copy to clipboard button
│   ├── hooks/
│   │   ├── use-toast.ts            # Toast notification hook
│   │   ├── use-realtime.ts         # Supabase realtime subscription
│   │   ├── use-projects.ts         # Projects data hook
│   │   ├── use-runs.ts             # Runs data hook
│   │   ├── use-costs.ts            # Costs data hook
│   │   └── use-auth.ts             # Auth state hook
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser Supabase client
│   │   │   ├── server.ts           # Server Supabase client
│   │   │   ├── middleware.ts       # Auth middleware helper
│   │   │   └── types.ts            # Generated database types
│   │   ├── vercel/
│   │   │   └── api.ts              # Vercel deploy API helpers
│   │   ├── validations/
│   │   │   ├── deploy.ts           # Deploy action schemas
│   │   │   └── auth.ts             # Auth form schemas
│   │   ├── utils.ts                # Utility functions (cn, formatCost)
│   │   └── constants.ts            # App constants (statuses, agents)
│   ├── types/
│   │   ├── index.ts                # Re-exports
│   │   ├── database.ts             # Supabase generated types
│   │   ├── forge.ts                # Forge-specific types
│   │   └── api.ts                  # API response types
│   └── providers/
│       ├── query-provider.tsx      # React Query provider
│       └── toast-provider.tsx      # Toast notifications provider
├── middleware.ts                   # Next.js middleware (auth protection)
└── tests/
    ├── setup.ts                    # Vitest setup
    └── components/
        └── project-card.test.tsx   # Example component test
```

<!-- FILE: api_spec.md -->
```markdown
# API Specification: clowforge-dashboard

## Base URL
- Development: `http://localhost:3000/api`
- Preview: `https://clowforge-dashboard-preview.vercel.app/api`
- Production: `https://forge.clowpaco.dev/api`

## Authentication
- All endpoints require authentication via Supabase session cookie
- Session validated in middleware before reaching API routes
- No public endpoints (internal tool)

## Standard Response Format
```json
{
  "data": "<result or null>",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

---

## Projects

### `GET /api/projects`

**Auth:** `authenticated`

**Description:** List all ClowForge projects with latest run status.

**Query Parameters:**
- `status`: Filter by status (optional): `planning` | `building` | `deployed` | `failed`
- `limit`: Max results (optional, default 50)

**Response (200):**
```json
{
  "data": {
    "projects": [
      {
        "id": "uuid",
        "name": "voyager",
        "description": "AI travel planning SaaS",
        "status": "deployed",
        "previewUrl": "https://voyager-abc123.vercel.app",
        "productionUrl": "https://voyager.app",
        "repositoryUrl": "https://github.com/clowpaco/voyager",
        "branch": "main",
        "createdAt": "2026-02-14T10:00:00Z",
        "updatedAt": "2026-02-14T15:30:00Z",
        "runsCount": 5,
        "lastRun": {
          "id": "uuid",
          "status": "completed",
          "completedAt": "2026-02-14T15:30:00Z",
          "costUsd": 0.45
        }
      }
    ],
    "total": 12
  },
  "error": null
}
```

### `GET /api/projects/[id]`

**Auth:** `authenticated`

**Description:** Get project details with recent runs.

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "name": "voyager",
    "description": "AI travel planning SaaS",
    "status": "deployed",
    "previewUrl": "https://voyager-abc123.vercel.app",
    "productionUrl": "https://voyager.app",
    "repositoryUrl": "https://github.com/clowpaco/voyager",
    "branch": "main",
    "createdAt": "2026-02-14T10:00:00Z",
    "updatedAt": "2026-02-14T15:30:00Z",
    "totalCostUsd": 1.85,
    "runs": [
      {
        "id": "uuid",
        "status": "completed",
        "startedAt": "2026-02-14T15:00:00Z",
        "completedAt": "2026-02-14T15:30:00Z",
        "durationMs": 1800000,
        "costUsd": 0.45,
        "tasksCount": 5,
        "tasksCompleted": 5
      }
    ]
  },
  "error": null
}
```

**Errors:**
| Status | Code | Description |
|--------|------|-------------|
| 404 | NOT_FOUND | Project not found |

---

## Runs

### `GET /api/runs`

**Auth:** `authenticated`

**Description:** List pipeline runs with filters.

**Query Parameters:**
- `projectId`: Filter by project (optional)
- `status`: Filter by status (optional): `pending` | `running` | `completed` | `failed`
- `limit`: Max results (optional, default 50)
- `offset`: Pagination offset (optional, default 0)

**Response (200):**
```json
{
  "data": {
    "runs": [
      {
        "id": "uuid",
        "projectId": "uuid",
        "projectName": "voyager",
        "status": "running",
        "startedAt": "2026-02-14T16:00:00Z",
        "completedAt": null,
        "durationMs": null,
        "costUsd": 0.12,
        "tasksCount": 5,
        "tasksCompleted": 2,
        "tasksFailed": 0,
        "agentsUsed": ["architect", "developer"]
      }
    ],
    "total": 45,
    "offset": 0,
    "limit": 50
  },
  "error": null
}
```

### `GET /api/runs/[id]`

**Auth:** `authenticated`

**Description:** Get run details with all tasks.

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "projectId": "uuid",
    "projectName": "voyager",
    "status": "completed",
    "startedAt": "2026-02-14T15:00:00Z",
    "completedAt": "2026-02-14T15:30:00Z",
    "durationMs": 1800000,
    "costUsd": 0.45,
    "errorMessage": null,
    "artifacts": {
      "blueprintUrl": "/forge/voyager/blueprint/",
      "designUrl": "/forge/voyager/design/"
    },
    "tasks": [
      {
        "id": "uuid",
        "agent": "architect",
        "phase": "planning",
        "status": "completed",
        "startedAt": "2026-02-14T15:00:00Z",
        "completedAt": "2026-02-14T15:10:00Z",
        "durationMs": 600000,
        "inputTokens": 15420,
        "outputTokens": 8320,
        "costUsd": 0.18
      }
    ]
  },
  "error": null
}
```

### `GET /api/runs/[id]/tasks`

**Auth:** `authenticated`

**Description:** Get tasks for a specific run (for realtime updates).

**Response (200):**
```json
{
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "agent": "developer",
        "phase": "build",
        "status": "running",
        "startedAt": "2026-02-14T15:15:00Z",
        "completedAt": null,
        "durationMs": null,
        "inputTokens": 0,
        "outputTokens": 0,
        "costUsd": 0
      }
    ]
  },
  "error": null
}
```

---

## Deploy

### `POST /api/deploy/preview`

**Auth:** `authenticated`

**Description:** Trigger a preview deployment for a project.

**Request:**
```json
{
  "projectId": "uuid — Project to deploy (required)",
  "runId": "uuid — Specific run to deploy (optional, latest if omitted)"
}
```

**Response (200):**
```json
{
  "data": {
    "deploymentId": "dpl_abc123",
    "previewUrl": "https://voyager-abc123.vercel.app",
    "status": "pending",
    "logId": "uuid"
  },
  "error": null
}
```

**Errors:**
| Status | Code | Description |
|--------|------|-------------|
| 400 | NO_ARTIFACTS | No build artifacts found for run |
| 403 | FORBIDDEN | User not authorized to deploy (viewer role) |
| 404 | NOT_FOUND | Project or run not found |
| 500 | DEPLOY_FAILED | Vercel API error |

### `POST /api/deploy/production`

**Auth:** `authenticated`

**Description:** Promote preview to production.

**Request:**
```json
{
  "projectId": "uuid — Project to deploy (required)",
  "previewUrl": "string — Preview URL to promote (required)"
}
```

**Response (200):**
```json
{
  "data": {
    "deploymentId": "dpl_xyz789",
    "productionUrl": "https://voyager.app",
    "status": "pending",
    "logId": "uuid"
  },
  "error": null
}
```

**Errors:**
| Status | Code | Description |
|--------|------|-------------|
| 400 | INVALID_PREVIEW | Preview URL not found or already promoted |
| 403 | FORBIDDEN | User not authorized (admin role required) |

### `POST /api/deploy/rollback`

**Auth:** `authenticated`

**Description:** Rollback production to previous deployment.

**Request:**
```json
{
  "projectId": "uuid — Project to rollback (required)",
  "deploymentId": "string — Deployment ID to rollback to (required)"
}
```

**Response (200):**
```json
{
  "data": {
    "deploymentId": "dpl_previous",
    "productionUrl": "https://voyager.app",
    "status": "pending",
    "logId": "uuid"
  },
  "error": null
}
```

**Errors:**
| Status | Code | Description |
|--------|------|-------------|
| 400 | INVALID_DEPLOYMENT | Deployment not found in history |
| 403 | FORBIDDEN | User not authorized (admin role required) |

---

## Costs

### `GET /api/costs`

**Auth:** `authenticated`

**Description:** Get cost summary with optional filters.

**Query Parameters:**
- `startDate`: Start of date range ISO (optional, default 30 days ago)
- `endDate`: End of date range ISO (optional, default now)

**Response (200):**
```json
{
  "data": {
    "totalCostUsd": 12.45,
    "runsCount": 28,
    "avgCostPerRun": 0.44,
    "byProject": [
      {
        "projectId": "uuid",
        "projectName": "voyager",
        "costUsd": 5.20,
        "runsCount": 12
      }
    ],
    "byAgent": [
      {
        "agent": "architect",
        "costUsd": 4.50,
        "tasksCount": 15
      },
      {
        "agent": "developer",
        "costUsd": 6.20,
        "tasksCount": 42
      }
    ]
  },
  "error": null
}
```

### `GET /api/costs/monthly`

**Auth:** `authenticated`

**Description:** Get monthly cost breakdown for charts.

**Query Parameters:**
- `months`: Number of months to include (optional, default 6)

**Response (200):**
```json
{
  "data": {
    "months": [
      {
        "month": "2026-02",
        "costUsd": 8.45,
        "runsCount": 18,
        "projectsCount": 4
      },
      {
        "month": "2026-01",
        "costUsd": 15.20,
        "runsCount": 35,
        "projectsCount": 6
      }
    ]
  },
  "error": null
}
```

---

## Health

### `GET /api/health`

**Auth:** `authenticated`

**Description:** Get system health status.

**Response (200):**
```json
{
  "data": {
    "status": "healthy",
    "services": {
      "supabase": {
        "status": "healthy",
        "latencyMs": 45
      },
      "vercel": {
        "status": "healthy",
        "latencyMs": 120
      },
      "openai": {
        "status": "healthy",
        "latencyMs": 200
      }
    },
    "pipeline": {
      "activeRuns": 2,
      "queuedRuns": 0,
      "failedLast24h": 1
    },
    "lastChecked": "2026-02-14T16:30:00Z"
  },
  "error": null
}
```

---

## Auth

### `POST /api/auth/callback`

**Auth:** `public`

**Description:** Handle Supabase auth callback (magic link, OAuth).

**Query Parameters:**
- `code`: Auth code from Supabase
- `next`: Redirect URL (optional, default `/`)

**Response (302):** Redirects to `next` URL
```

<!-- FILE: env_vars.md -->
```markdown
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

```bash
# ===========================================
# ClowForge Dashboard Environment Variables
# ===========================================
# Copy to .env.local and fill in values
# NEVER commit .env.local to git

# Supabase (ClowPaco project - existing)
NEXT_PUBLIC_SUPABASE_URL=https://bfoftsjiqkoqcueagsmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Vercel API (for deployments)
VERCEL_TOKEN=vercel_xxxxxxxxxxxxxxxxxxxxxxxx
# VERCEL_TEAM_ID=team_xxxx  # Optional, if using team

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Health check (optional)
# OPENAI_API_KEY=sk-...
```

## Existing Tables Reference

The dashboard reads from these existing tables in ClowPaco Supabase:

```
forge_projects
├── id (uuid)
├── name (text)
├── description (text)
├── status (text)
├── preview_url (text)
├── production_url (text)
├── repository_url (text)
├── branch (text)
├── created_at (timestamptz)
└── updated_at (timestamptz)

forge_runs
├── id (uuid)
├── project_id (uuid, FK)
├── status (text)
├── started_at (timestamptz)
├── completed_at (timestamptz)
├── error_message (text)
├── artifacts (jsonb)
├── cost_usd (numeric)
├── created_at (timestamptz)
└── updated_at (timestamptz)

forge_tasks
├── id (uuid)
├── run_id (uuid, FK)
├── agent (text)
├── phase (text)
├── status (text)
├── started_at (timestamptz)
├── completed_at (timestamptz)
├── duration_ms (int)
├── input_tokens (int)
├── output_tokens (int)
├── cost_usd (numeric)
└── created_at (timestamptz)
```

These tables are managed by the ClowForge pipeline. The dashboard has SELECT-only access.
```