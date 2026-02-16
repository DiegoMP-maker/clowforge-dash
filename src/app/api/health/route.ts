import { NextResponse } from 'next/server';

import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { error } = await supabase.from('forge_projects').select('name').limit(1);

    const supabaseStatus = error ? 'degraded' : 'operational';

    return NextResponse.json({
      data: {
        supabase: supabaseStatus,
        vercel: 'operational',
        openai: 'operational',
      },
      error: null,
    });
  } catch (error) {
    console.error('[GET] /api/health', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
