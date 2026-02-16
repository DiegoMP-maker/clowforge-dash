import Link from 'next/link';
import { redirect } from 'next/navigation';

import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { createServerClient } from '@/lib/supabase/server';
import { formatRelativeTime } from '@/lib/utils';
import type { Project } from '@/types/Project.types';
import type { Run } from '@/types/Run.types';

export default async function HomePage() {
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  const [{ data: projects }, { data: runs }] = await Promise.all([
    supabase.from('forge_projects').select('*').order('created_at', { ascending: false }).returns<Project[]>(),
    supabase.from('forge_runs').select('*').order('created_at', { ascending: false }).limit(10).returns<Run[]>(),
  ]);

  const allProjects = projects ?? [];
  const recentRuns = runs ?? [];
  const activeRuns = recentRuns.filter((r) => r.status === 'running');
  const completedRuns = recentRuns.filter((r) => r.status === 'completed');
  const failedRuns = recentRuns.filter((r) => r.status === 'failed');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={allProjects.length} label="Projects" />
        <StatCard value={activeRuns.length} label="Active Runs" />
        <StatCard value={completedRuns.length} label="Completed (recent)" />
        <StatCard value={failedRuns.length} label="Failed (recent)" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Projects</h2>
            <Link href="/projects" className="text-sm text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {allProjects.length === 0 ? (
              <p className="text-sm text-neutral-500">No projects yet.</p>
            ) : (
              allProjects.map((p) => (
                <Link
                  key={p.name}
                  href={`/projects/${encodeURIComponent(p.name)}`}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-neutral-50"
                >
                  <span className="font-medium text-neutral-900">{p.name}</span>
                  <StatusBadge status={p.current_phase ?? 'pending'} size="sm" />
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Runs</h2>
            <Link href="/runs" className="text-sm text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentRuns.length === 0 ? (
              <p className="text-sm text-neutral-500">No runs yet.</p>
            ) : (
              recentRuns.slice(0, 8).map((r) => (
                <Link
                  key={r.id}
                  href={`/runs/${r.id}`}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-neutral-50"
                >
                  <div>
                    <span className="font-medium text-neutral-900">{r.project_name}</span>
                    <span className="ml-2 text-neutral-400">{r.trigger}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} size="sm" />
                    <span className="text-xs text-neutral-400">{formatRelativeTime(r.created_at)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
