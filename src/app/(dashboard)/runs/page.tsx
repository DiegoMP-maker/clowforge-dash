import { redirect } from 'next/navigation';

import { EmptyState } from '@/components/ui/EmptyState';
import { RunTable } from '@/components/runs/RunTable';
import { COPY } from '@/lib/copy';
import { createServerClient } from '@/lib/supabase/server';
import type { Run } from '@/types/Run.types';

export default async function RunsPage() {
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('forge_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Run[]>();

  if (error) {
    throw new Error(error.message);
  }

  const runs = data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">{COPY.runs.title}</h1>
      {runs.length === 0 ? (
        <EmptyState title={COPY.runs.empty.title} message={COPY.runs.empty.message} />
      ) : (
        <RunTable runs={runs} />
      )}
    </div>
  );
}
