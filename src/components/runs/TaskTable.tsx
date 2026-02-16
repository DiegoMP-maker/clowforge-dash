import { COPY } from '@/lib/copy';
import type { Task } from '@/types/Task.types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Table } from '@/components/ui/Table';

type TaskTableProps = {
  tasks: Task[];
};

export function TaskTable({ tasks }: TaskTableProps): React.ReactElement {
  return (
    <Table
      columns={[
        'Kind',
        COPY.runs.table.agent,
        COPY.runs.table.status,
        'Attempt',
        'Error',
      ]}
    >
      {tasks.map((task) => (
        <tr key={task.id} className="text-sm text-neutral-700">
          <td className="px-4 py-3 font-medium text-neutral-900">{task.kind}</td>
          <td className="px-4 py-3 text-neutral-600">{task.agent_id ?? '—'}</td>
          <td className="px-4 py-3">
            <StatusBadge status={task.status} size="sm" />
          </td>
          <td className="px-4 py-3 text-neutral-500">{task.attempt ?? 1}</td>
          <td className="px-4 py-3 text-neutral-500 max-w-xs truncate">
            {task.error_log ? (
              <span className="text-error" title={task.error_log}>
                {task.error_log.slice(0, 80)}
              </span>
            ) : (
              '—'
            )}
          </td>
        </tr>
      ))}
    </Table>
  );
}
