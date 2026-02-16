import type { ReactNode } from 'react';

import { COPY } from '@/lib/copy';
import { cn } from '@/lib/utils';

type StatCardProps = {
  value: string | number;
  label: string;
  icon?: React.ElementType;
  trend?: { value: number; direction: 'up' | 'down' };
  loading?: boolean;
  className?: string;
};

export function StatCard({ value, label, icon: Icon, trend, loading, className }: StatCardProps) {
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;
  return (
    <div className={cn('rounded-lg border border-neutral-200 bg-white p-4 shadow-sm', className)}>
      <div className="flex items-center justify-between">
        {Icon ? <Icon className="h-5 w-5 text-primary-600" aria-hidden="true" /> : <span />}
        {trend ? (
          <span className={cn('text-xs font-medium', trend.direction === 'up' ? 'text-secondary-700' : 'text-error-dark')}>
            {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        ) : null}
      </div>
      <div className="mt-3">
        <div className={cn('text-2xl font-bold text-neutral-900', loading && 'opacity-50')}>
          {loading ? COPY.actions.loading : displayValue}
        </div>
        <p className="text-sm text-neutral-600">{label}</p>
      </div>
    </div>
  );
}
