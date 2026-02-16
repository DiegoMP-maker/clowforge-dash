import { redirect } from 'next/navigation';

import { EmptyState } from '@/components/ui/EmptyState';
import { RunTable } from '@/components/runs/RunTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { COPY } from '@/lib/copy';
import { createServerClient } from '@/lib/supabase/server';
import { formatRelativeTime } from '@/lib/utils';
import type { Project } from '@/types/Project.types';
import type { Run } from '@/types/Run.types';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectName = decodeURIComponent(id);
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  const { data: project, error: projectError } = await supabase
    .from('forge_projects')
    .select('*')
    .eq('name', projectName)
    .maybeSingle()
    .returns<Project>();

  if (projectError || !project) {
    throw new Error(projectError?.message ?? 'Project not found');
  }

  const { data: runs, error: runError } = await supabase
    .from('forge_runs')
    .select('*')
    .eq('project_name', projectName)
    .order('created_at', { ascending: false })
    .returns<Run[]>();

  if (runError) {
    throw new Error(runError.message);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">{project.name}</h1>
        <p className="text-sm text-neutral-600">{project.description}</p>
      </div>
      <div className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700 sm:grid-cols-2">
        <div>
          <div className="text-xs uppercase text-neutral-500">Phase</div>
          <div className="mt-1">
            <StatusBadge status={project.current_phase ?? 'pending'} size="sm" />
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">{COPY.project.info.created}</div>
          <div className="font-medium text-neutral-900">{formatRelativeTime(project.created_at)}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">{COPY.project.info.preview}</div>
          <div className="font-medium text-neutral-900">
            {project.preview_url ? (
              <a href={project.preview_url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">
                {project.preview_url}
              </a>
            ) : (
              <span className="text-neutral-400">—</span>
            )}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">{COPY.project.info.production}</div>
          <div className="font-medium text-neutral-900">
            {project.prod_url ? (
              <a href={project.prod_url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">
                {project.prod_url}
              </a>
            ) : (
              <span className="text-neutral-400">—</span>
            )}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">{COPY.project.info.repository}</div>
          <div className="font-medium text-neutral-900">
            {project.repo_url ? (
              <a href={project.repo_url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">
                {project.repo_url}
              </a>
            ) : (
              <span className="text-neutral-400">—</span>
            )}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">Stack</div>
          <div className="font-medium text-neutral-900">{project.stack ?? '—'}</div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">{COPY.project.tabs.runs}</h2>
        {runs && runs.length > 0 ? (
          <div className="mt-4">
            <RunTable runs={runs} />
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState title={COPY.project.runs.empty.title} message={COPY.project.runs.empty.message} />
          </div>
        )}
      </div>
    </div>
  );
}
