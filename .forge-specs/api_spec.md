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
