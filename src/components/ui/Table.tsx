import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TableProps = {
  columns: string[];
  children: ReactNode;
  className?: string;
};

export function Table({ columns, children, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-neutral-200 bg-white', className)}>
      <table className="min-w-full divide-y divide-neutral-200 text-sm">
        <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase text-neutral-500">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">{children}</tbody>
      </table>
    </div>
  );
}
