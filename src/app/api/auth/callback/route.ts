import { NextResponse } from 'next/server';

import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
      const supabase = await createServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  } catch (error) {
    console.error('[GET] /api/auth/callback', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
