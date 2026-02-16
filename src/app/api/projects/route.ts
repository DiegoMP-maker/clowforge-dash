import { NextResponse } from 'next/server';

import { createServerClient } from '@/lib/supabase/server';
import type { Project } from '@/types/Project.types';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('forge_projects')
      .select('*')
      .order('updated_at', { ascending: false })
      .returns<Project[]>();

    if (error) {
      return NextResponse.json(
        { data: null, error: { code: 'DB_ERROR', message: error.message } },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: data ?? [], error: null });
  } catch (error) {
    console.error('[GET] /api/projects', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
