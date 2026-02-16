import Link from 'next/link';

import { COPY } from '@/lib/copy';
import type { Project } from '@/types/Project.types';
import { formatRelativeTime } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Table } from '@/components/ui/Table';

type ProjectTableProps = {
  projects: Project[];
};

export function ProjectTable({ projects }: ProjectTableProps): React.ReactElement {
  return (
    <Table
      columns={[
        COPY.projects.title,
        'Phase',
        'Created',
        COPY.projects.table.preview,
        COPY.projects.table.production,
        COPY.projects.table.repository,
      ]}
    >
      {projects.map((project) => (
        <tr key={project.name} className="text-sm text-neutral-700">
          <td className="px-4 py-3 font-medium text-neutral-900">
            <Link href={`/projects/${encodeURIComponent(project.name)}`} className="hover:text-primary-600">
              {project.name}
            </Link>
          </td>
          <td className="px-4 py-3">
            <StatusBadge status={project.current_phase ?? 'pending'} size="sm" />
          </td>
          <td className="px-4 py-3 text-neutral-500">{formatRelativeTime(project.created_at)}</td>
          <td className="px-4 py-3">
            {project.preview_url ? (
              <a className="text-primary-600 hover:underline" href={project.preview_url} target="_blank" rel="noreferrer">
                {COPY.projects.table.preview}
              </a>
            ) : null}
          </td>
          <td className="px-4 py-3">
            {project.prod_url ? (
              <a className="text-primary-600 hover:underline" href={project.prod_url} target="_blank" rel="noreferrer">
                {COPY.projects.table.production}
              </a>
            ) : null}
          </td>
          <td className="px-4 py-3">
            {project.repo_url ? (
              <a className="text-primary-600 hover:underline" href={project.repo_url} target="_blank" rel="noreferrer">
                {COPY.projects.table.repository}
              </a>
            ) : null}
          </td>
        </tr>
      ))}
    </Table>
  );
}
