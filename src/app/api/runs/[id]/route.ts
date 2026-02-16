import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { idSchema } from '@/lib/validations/query';
import { createServerClient } from '@/lib/supabase/server';
import type { Run } from '@/types/Run.types';
import type { Task } from '@/types/Task.types';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    idSchema.parse(id);

    const supabase = await createServerClient();
    const { data: run, error: runError } = await supabase
      .from('forge_runs')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .returns<Run>();

    if (runError) {
      return NextResponse.json(
        { data: null, error: { code: 'DB_ERROR', message: runError.message } },
        { status: 500 },
      );
    }

    if (!run) {
      return NextResponse.json(
        { data: null, error: { code: 'NOT_FOUND', message: 'Run not found' } },
        { status: 404 },
      );
    }

    const { data: tasks, error: taskError } = await supabase
      .from('forge_tasks')
      .select('*')
      .eq('run_id', id)
      .order('created_at', { ascending: true })
      .returns<Task[]>();

    if (taskError) {
      return NextResponse.json(
        { data: null, error: { code: 'DB_ERROR', message: taskError.message } },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: { run, tasks: tasks ?? [] }, error: null });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { data: null, error: { code: 'VALIDATION_ERROR', message: 'Invalid run id' } },
        { status: 400 },
      );
    }
    console.error('[GET] /api/runs/[id]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
