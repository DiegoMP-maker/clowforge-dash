import { redirect } from 'next/navigation';

import { StatCard } from '@/components/ui/StatCard';
import { Table } from '@/components/ui/Table';
import { COPY } from '@/lib/copy';
import { createServerClient } from '@/lib/supabase/server';
import type { Run } from '@/types/Run.types';

export default async function CostsPage() {
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  const { data: runs } = await supabase
    .from('forge_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Run[]>();

  const allRuns = runs ?? [];

  // Aggregate per project
  const byProject = new Map<string, { runs: number; completed: number; failed: number }>();
  for (const run of allRuns) {
    const entry = byProject.get(run.project_name) ?? { runs: 0, completed: 0, failed: 0 };
    entry.runs++;
    if (run.status === 'completed') entry.completed++;
    if (run.status === 'failed') entry.failed++;
    byProject.set(run.project_name, entry);
  }

  const completedCount = allRuns.filter((r) => r.status === 'completed').length;
  const failedCount = allRuns.filter((r) => r.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">{COPY.costs.title}</h1>
      </div>
      <div className="rounded-md border border-info-light bg-info-light/30 px-4 py-3 text-sm text-info-dark">
        Cost tracking per run coming soon. Currently showing run statistics.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={allRuns.length} label="Total Runs" />
        <StatCard value={completedCount} label="Completed" />
        <StatCard value={failedCount} label="Failed" />
        <StatCard value={byProject.size} label="Projects" />
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900">Runs by Project</h2>
        <div className="mt-4">
          <Table columns={['Project', 'Total Runs', 'Completed', 'Failed', 'Success Rate']}>
            {[...byProject.entries()].map(([name, stats]) => {
              const rate = stats.runs ? ((stats.completed / stats.runs) * 100).toFixed(0) : '—';
              return (
                <tr key={name} className="text-sm text-neutral-700">
                  <td className="px-4 py-3 font-medium text-neutral-900">{name}</td>
                  <td className="px-4 py-3 text-neutral-600">{stats.runs}</td>
                  <td className="px-4 py-3 text-secondary">{stats.completed}</td>
                  <td className="px-4 py-3 text-error">{stats.failed}</td>
                  <td className="px-4 py-3 text-neutral-600">{rate}%</td>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}
