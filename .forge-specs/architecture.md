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

## Key Architectural Decisions

### ADR-001: Read-Only Access to Existing ClowForge Tables
**Context:** The `forge_projects`, `forge_runs`, and `forge_tasks` tables already exist in the ClowPaco Supabase project. The dashboard must not modify the pipeline's core data.
**Decision:** Dashboard queries these tables read-only via Supabase client. No migrations for these tables. Write operations (like triggering deploys) go through API routes that call external services.
**Consequences:** Clean separation of concerns. Dashboard cannot corrupt pipeline state.

### ADR-002: Invite-Only Authentication
**Context:** This is an internal tool. No self-registration needed.
**Decision:** No `/signup` page. Admin creates users via Supabase dashboard or CLI. Login is email/password only—no OAuth complexity for internal tool.
**Consequences:** Simpler auth flow. User onboarding is manual (acceptable for small team).

### ADR-003: Real-Time Build Status via Supabase Realtime
**Context:** Users need live updates during pipeline runs without manual refresh.
**Decision:** Subscribe to `forge_runs` and `forge_tasks` tables via Supabase Realtime. Update UI optimistically as tasks complete.
**Consequences:** Live progress bars and status changes.

### ADR-004: Server Components for Dashboard Pages
**Context:** Dashboard is data-heavy. Need fast initial load with fresh data.
**Decision:** Use Next.js Server Components for all dashboard pages. Fetch data server-side. Use React Query only for client-side polling/refetch.
**Consequences:** Fast initial render. Slightly more complex hydration for real-time features.

## Authentication Flow

### Login (Email/Password)
1. User navigates to `/login`
2. Enters email and password
3. Client calls `supabase.auth.signInWithPassword()`
4. Session stored in httpOnly cookie via `@supabase/ssr`
5. Middleware validates session on subsequent requests
6. Redirect to `/` (projects dashboard)

### Route Protection
- Protected (require auth): /, /projects/*, /runs/*, /costs, /health, /settings
- Public: /login, /api/auth/callback

## Data Flow Patterns

### Caching Strategy
- Server Components: No cache (always fresh for dashboard)
- React Query staleTime: 30 seconds for project/run lists
- Realtime: Instant updates bypass cache
- Cost aggregations: Cache 5 minutes (less volatile)

## Error Handling Strategy

### API Error Response Format
```json
{
  "data": null,
  "error": {
    "code": "NOT_FOUND",
    "message": "Run abc123 not found"
  }
}
```

### Toast Notifications
- Success: Green, auto-dismiss 3s
- Error: Red, manual dismiss
- Info: Blue, auto-dismiss 5s
