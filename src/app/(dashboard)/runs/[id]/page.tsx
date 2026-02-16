import Link from 'next/link';
import { redirect } from 'next/navigation';

import { EmptyState } from '@/components/ui/EmptyState';
import { TaskTable } from '@/components/runs/TaskTable';
import { COPY } from '@/lib/copy';
import { formatDuration, formatRelativeTime } from '@/lib/utils';
import { createServerClient } from '@/lib/supabase/server';
import type { Run } from '@/types/Run.types';
import type { Task } from '@/types/Task.types';

export default async function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  const { data: run, error: runError } = await supabase
    .from('forge_runs')
    .select('*')
    .eq('id', id)
    .maybeSingle()
    .returns<Run>();

  if (runError || !run) {
    throw new Error(runError?.message ?? 'Run not found');
  }

  const { data: tasks, error: taskError } = await supabase
    .from('forge_tasks')
    .select('*')
    .eq('run_id', id)
    .order('created_at', { ascending: true })
    .returns<Task[]>();

  if (taskError) {
    throw new Error(taskError.message);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">{COPY.runs.title}</h1>
        <div className="mt-3 grid gap-4 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase text-neutral-500">{COPY.run.info.id}</div>
            <div className="font-medium text-neutral-900 font-mono text-xs">{run.id}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-500">{COPY.run.info.status}</div>
            <div className="font-medium text-neutral-900">{COPY.status[run.status] ?? run.status}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-500">{COPY.run.info.project}</div>
            <div className="font-medium text-neutral-900">
              <Link href={`/projects/${encodeURIComponent(run.project_name)}`} className="text-primary-600 hover:underline">
                {run.project_name}
              </Link>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-500">Trigger</div>
            <div className="font-medium text-neutral-900">{run.trigger}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-500">{COPY.run.info.started}</div>
            <div className="font-medium text-neutral-900">{formatRelativeTime(run.created_at)}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-500">{COPY.run.info.duration}</div>
            <div className="font-medium text-neutral-900">
              {formatDuration(
                run.created_at && run.completed_at
                  ? new Date(run.completed_at).getTime() - new Date(run.created_at).getTime()
                  : null,
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">{COPY.run.tasks.title}</h2>
        {tasks && tasks.length > 0 ? (
          <div className="mt-4">
            <TaskTable tasks={tasks} />
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState title={COPY.run.empty.tasks.title} message={COPY.run.empty.tasks.message} />
          </div>
        )}
      </div>
    </div>
  );
}
