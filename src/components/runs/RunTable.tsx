import Link from 'next/link';

import { COPY } from '@/lib/copy';
import type { Run } from '@/types/Run.types';
import { formatDuration, formatRelativeTime } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Table } from '@/components/ui/Table';

type RunTableProps = {
  runs: Run[];
};

export function RunTable({ runs }: RunTableProps): React.ReactElement {
  return (
    <Table
      columns={[
        COPY.runs.table.id,
        COPY.runs.table.project,
        COPY.runs.table.status,
        'Trigger',
        COPY.runs.table.started,
        COPY.runs.table.duration,
      ]}
    >
      {runs.map((run) => (
        <tr key={run.id} className="text-sm text-neutral-700">
          <td className="px-4 py-3 font-medium text-neutral-900">
            <Link href={`/runs/${run.id}`} className="hover:text-primary-600">
              {run.id.slice(0, 8)}
            </Link>
          </td>
          <td className="px-4 py-3 text-neutral-600">
            <Link href={`/projects/${encodeURIComponent(run.project_name)}`} className="hover:text-primary-600">
              {run.project_name}
            </Link>
          </td>
          <td className="px-4 py-3">
            <StatusBadge status={run.status} size="sm" />
          </td>
          <td className="px-4 py-3 text-neutral-500">{run.trigger}</td>
          <td className="px-4 py-3 text-neutral-500">{formatRelativeTime(run.created_at)}</td>
          <td className="px-4 py-3 text-neutral-500">
            {formatDuration(
              run.created_at && run.completed_at
                ? new Date(run.completed_at).getTime() - new Date(run.created_at).getTime()
                : null,
            )}
          </td>
        </tr>
      ))}
    </Table>
  );
}
