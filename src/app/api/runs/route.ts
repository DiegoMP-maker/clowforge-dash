import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { runQuerySchema } from '@/lib/validations/runs';
import { createServerClient } from '@/lib/supabase/server';
import type { Run } from '@/types/Run.types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = runQuerySchema.parse({
      status: searchParams.get('status') ?? undefined,
      projectId: searchParams.get('projectId') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
    });

    const supabase = await createServerClient();
    let query = supabase.from('forge_runs').select('*').order('created_at', { ascending: false });

    if (parsed.status) {
      query = query.eq('status', parsed.status);
    }

    if (parsed.projectId) {
      query = query.eq('project_name', parsed.projectId);
    }

    if (parsed.limit) {
      query = query.limit(parsed.limit);
    }

    const { data, error } = await query.returns<Run[]>();

    if (error) {
      return NextResponse.json(
        { data: null, error: { code: 'DB_ERROR', message: error.message } },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: data ?? [], error: null });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { data: null, error: { code: 'VALIDATION_ERROR', message: 'Invalid query' } },
        { status: 400 },
      );
    }
    console.error('[GET] /api/runs', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
