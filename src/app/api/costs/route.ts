import { NextResponse } from 'next/server';

import { createServerClient } from '@/lib/supabase/server';
import type { Run } from '@/types/Run.types';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data: runs, error } = await supabase
      .from('forge_runs')
      .select('*')
      .order('created_at', { ascending: false })
      .returns<Run[]>();

    if (error) {
      return NextResponse.json(
        { data: null, error: { code: 'DB_ERROR', message: error.message } },
        { status: 500 },
      );
    }

    const allRuns = runs ?? [];

    // Aggregate per project
    const byProject: Record<string, { runs: number; completed: number; failed: number }> = {};
    for (const run of allRuns) {
      const entry = byProject[run.project_name] ?? { runs: 0, completed: 0, failed: 0 };
      entry.runs++;
      if (run.status === 'completed') entry.completed++;
      if (run.status === 'failed') entry.failed++;
      byProject[run.project_name] = entry;
    }

    const projects = Object.entries(byProject).map(([name, stats]) => ({
      project_name: name,
      run_count: stats.runs,
      completed: stats.completed,
      failed: stats.failed,
      success_rate: stats.runs ? stats.completed / stats.runs : 0,
    }));

    return NextResponse.json({
      data: { projects, total_runs: allRuns.length },
      error: null,
    });
  } catch (error) {
    console.error('[GET] /api/costs', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
